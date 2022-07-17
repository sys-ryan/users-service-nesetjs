import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { HandlerRolesGuard } from 'src/Guards/handler-roles.guard';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: APP_GUARD, useClass: HandlerRolesGuard },
  ],
})
export class UsersModule {}
