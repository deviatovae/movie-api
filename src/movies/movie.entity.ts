import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Movie {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
