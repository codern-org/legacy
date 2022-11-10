import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/AuthModule';
import { configuration } from '@/utils/Configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),

    AuthModule,
  ],
  providers: [Logger],
})
export class AppModule {}
