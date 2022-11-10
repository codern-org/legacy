import { Controller, Get } from '@nestjs/common';
import { GatewayService } from '@/services/GatewayService';

@Controller()
export class GatewayController {

  private readonly gatewayService: GatewayService;

  public constructor(gatewayService: GatewayService) {
    this.gatewayService = gatewayService;
  }

  @Get()
  public getInfo(): { message: string } {
    return this.gatewayService.getInfo();
  }

}
