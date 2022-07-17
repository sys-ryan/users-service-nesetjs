import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './Guards/auth.guard';
import { User } from './users/decorators/user';
import { UserData } from './users/decorators/user-data';
import { UserEntity } from './users/user.entity';

interface User {
  name: string;
  email: string;
}

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @UseGuards(AuthGuard)
  @Get()
  getHello(@User() user: User): string {
    console.log(user);
    return;
  }

  @UseGuards(AuthGuard)
  @Get('/username')
  getHello2(
    @UserData('name') name: string,
    // @UserData() name: User,
  ): string {
    console.log(name);
    return;
  }

  @Get('/db-host-from-config')
  getDatabaseHostFromCOnfigService(): string {
    return this.configService.get('DATABASE_HOST');
  }

  // @Get('/:id')
  // findOne(
  //   @Param(
  //     'id',
  //     ValidationPipe,
  //     // ParseIntPipe,
  //     // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ) {
  //   return typeof id;
  // }
}
