import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), UserModule, AuthModule, ItemModule, CollectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
