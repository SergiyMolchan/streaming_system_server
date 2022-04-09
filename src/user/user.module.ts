import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from "./user.repository";
import { DbModule, DbService } from '../db';
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [
    ConfigService,
    DbService,
    UserRepository,
    UserService,
  ],
  exports: [UserRepository]
})
export class UserModule {}
