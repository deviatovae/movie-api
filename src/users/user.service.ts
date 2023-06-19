import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../movies/movie.entity';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Password } from '../infrastructure/password.service';
import { ValidationError } from '../infrastructure/validationError';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: MongoRepository<User>,
    private readonly password: Password,
  ) {}

  getUserByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const { email, password, name } = dto;
    const userEmail = await this.getUserByEmail(email);

    if (userEmail) {
      throw new ValidationError('Email already in use');
    }

    const [hashedPassword, salt] = await this.password.hashPassword(password);
    const user = new User(email, name, hashedPassword, salt);
    return this.repository.save(user);
  }
}
