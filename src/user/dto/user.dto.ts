import { User } from '../user.entity';
export class UserDto {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly name: string,
  ) {}

  static createFromUser({ id, email, name }: User): UserDto {
    return {
      id: id.toString(),
      email,
      name,
    };
  }
}
