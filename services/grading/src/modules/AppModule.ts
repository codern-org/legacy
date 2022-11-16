import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GradingModule } from '@/modules/GradingModule';
import { configuration } from '@/utils/Configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),

    GradingModule,
  ],
  providers: [Logger],
})
export class AppModule {}
