import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
@Injectable()
export class Password {
  genSalt(): Promise<string> {
    return bcrypt.genSalt();
  }
  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
