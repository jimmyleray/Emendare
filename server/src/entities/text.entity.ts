import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'

@Entity()
export class Text extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column({ default: new Date(Date.now()) })
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

  @Column({ default: [] })
  amends: string[]

  constructor(name: string, description: string) {
    super()

    this.name = name
    this.description = description
    this.created = new Date(Date.now())
    this.followersCount = 0
    this.actual = ''
    this.patches = []
    this.amends = []
  }
}
