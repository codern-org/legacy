import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from '@/services/AuthService';

type LoginPayload = {
  username: string,
  password: string,
};

type HealthCheckPayload = {
  pingTime: [number, number],
};

type HealthCheckResponse = {
  uptime: number,
  destRecvTime: number,
  srcRecvTime: number,
  timestamp: number,
};

@Controller()
export class AuthController {

  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  @MessagePattern({ cmd: 'login' })
  public async login(data: LoginPayload): Promise<boolean> {
    return (data.username === data.password);
  }

  @MessagePattern({ cmd: 'healthcheck' })
  public async healthCheck(data: HealthCheckPayload): Promise<HealthCheckResponse> {
    const { pingTime } = data;
    const pongTime = process.hrtime(pingTime);
    return {
      uptime: process.uptime(),
      destRecvTime: pongTime[0] * 1_000_000_000 + pongTime[1] / 1_000_000,
      srcRecvTime: 0,
      timestamp: Date.now(),
    };
  }

}
