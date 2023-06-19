import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { isInstance } from 'class-validator';
import { ValidationError } from '../validation/validation-error';
import { IsPublic } from '../auth/decorator/is-public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  createUser(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.userService
      .createUser(dto)
      .then((user) => UserDto.createFromUser(user))
      .catch((err) => {
        throw isInstance(err, ValidationError)
          ? new UnprocessableEntityException(err.message)
          : err;
      });
  }
}
