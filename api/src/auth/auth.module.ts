import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashService } from './hash.service';

@Module({
  providers: [AuthService, HashService],
  controllers: [AuthController],
  exports: [HashService]
})
export class AuthModule {}
