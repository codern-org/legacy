import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';

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

@Controller('/auth')
export class AuthController {

  private readonly client: ClientProxy;

  public constructor(@Inject('AUTH_SERVICE') client: ClientProxy) {
    this.client = client;
  }

  @Get()
  public login(): Observable<boolean> {
    return this.client.send<boolean, LoginPayload>(
      { cmd: 'login' },
      { username: '1', password: '2' },
    );
  }

  @Get('/healthcheck')
  public healthCheck(): Observable<HealthCheckResponse> {
    const pingTime = process.hrtime();

    return this.client.send<HealthCheckResponse, HealthCheckPayload>(
      { cmd: 'healthcheck' },
      { pingTime },
    ).pipe(map((response) => {
      const pongTime = process.hrtime(pingTime);
      const srcRecvTime = pongTime[0] * 1_000_000_000 + pongTime[1] / 1_000_000;
      return {
        ...response,
        srcRecvTime,
      };
    }));
  }

}
