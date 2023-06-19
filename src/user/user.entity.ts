import { Column, Entity, Index, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  constructor(email: string, name: string, password: string, salt: string) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.salt = salt;
  }
}
