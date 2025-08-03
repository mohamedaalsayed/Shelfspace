import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { HashService } from 'src/auth/hash.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, HashService],
  controllers: [UserController],
})
export class UserModule {}
