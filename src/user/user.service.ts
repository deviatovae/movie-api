import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationError } from '../validation/validation-error';
import { HashPasswordService } from '../security/hash-password.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: MongoRepository<User>,
    private readonly password: HashPasswordService,
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

    const salt = await this.password.genSalt();
    const hashedPassword = await this.password.hashPassword(password, salt);
    const user = new User(email, name, hashedPassword, salt);
    return this.repository.save(user);
  }

  getUserById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ _id: new ObjectId(id) });
  }
}
