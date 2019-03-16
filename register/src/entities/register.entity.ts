import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id: number
}
