import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import cookie from 'cookie';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { SessionRepository } from '@/repositories/SessionRepository';
import { GoogleService } from '@/services/GoogleService';
import { UserService } from '@/services/UserService';

@Injectable()
export class AuthService {

  public static readonly SESSION_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
  public static readonly SESSION_SIGN_PREFIX = '$:';

  private readonly configService: ConfigService;
  private readonly sessionRepository: SessionRepository;
  private readonly googleService: GoogleService;
  private readonly userService: UserService;

  public constructor(
    configService: ConfigService,
    sessionRepository: SessionRepository,
    googleService: GoogleService,
    userService: UserService,
  ) {
    this.configService = configService;
    this.sessionRepository = sessionRepository;
    this.googleService = googleService;
    this.userService = userService;
  }

  public signSessionId(id: string): string {
    const secretKey = this.configService.get('sessionSecret');
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(id)
      .digest('base64')
      // eslint-disable-next-line no-useless-escape
      .replace(/\=+$/, '');
    return `${AuthService.SESSION_SIGN_PREFIX}${id}.${signature}`;
  }

  public unSignSessionId(input: string): string {
    const tentativeValue = input.slice(0, input.lastIndexOf('.'));
    const expectedInput = this.signSessionId(tentativeValue);
    const expectedBuffer = Buffer.from(expectedInput);
    const inputBuffer = Buffer.from(input);
    return (
      (expectedBuffer.length === inputBuffer.length)
      && (crypto.timingSafeEqual(expectedBuffer, inputBuffer))
    ) ? tentativeValue : '';
  }

  public async createSession(
    userId: string,
    userAgent: string,
    ipAddress: string,
  ): Promise<string> {
    await this.sessionRepository.deleteSession({ userId, userAgent, ipAddress });

    const sessionId = crypto.randomUUID();
    const signedSessionId = this.signSessionId(sessionId);

    const expiryDate = new Date(Date.now() + AuthService.SESSION_MAX_AGE);
    const cookieData = cookie.serialize('sid', signedSessionId, {
      path: '/',
      httpOnly: true,
      maxAge: expiryDate.getTime(),
    });

    await this.sessionRepository.createSession({
      id: sessionId,
      user: { connect: { id: userId } },
      ipAddress,
      userAgent,
      expiryDate,
    });

    return cookieData;
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserWithSelfProvider(email);
    if (!user) throw new Error('Username or password is invalid');

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Username or password is invalid');

    return user;
  }

  public async loginWithGoogle(code: string): Promise<User> {
    const token = await this.googleService.getToken(code);
    const googleUser = await this.googleService.getGoogleUser(token);
    const userId = this.userService.hashUserId(googleUser.id, 'GOOGLE');

    const user = await this.userService.getOrCreateUser(userId, 'GOOGLE');
    await this.userService.updateEmail(userId, googleUser.email);

    return user;
  }

}
