import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
@Injectable()
export class Password {
  async hashPassword(password: string): Promise<string[]> {
    const salt = await bcrypt.genSalt();
    return [await bcrypt.hash(password, salt), salt];
  }
}
