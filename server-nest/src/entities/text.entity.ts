import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'
import { Amend } from '../entities'

@Entity()
export class Text extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column({ default: Date.now })
  created: Date

  @Column()
  name: string

  @Column()
  description: string

  @Column({ default: 0 })
  followersCount: number

  @Column({ default: '' })
  actual: string

  @Column({ default: [] })
  patches: string[]

  @Column(type => Amend)
  amends: Array<Amend['id']>

  constructor(name: string, description: string) {
    super()
    this.name = name
    this.description = description
  }
}
