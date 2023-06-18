import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Movie {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'double' })
  rating = 0;

  @Column()
  ratingCount = 0;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
