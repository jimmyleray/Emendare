import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'
import { Field, ObjectType, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class Text extends BaseEntity {
  @Field(type => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field()
  @Column({ default: Date.now })
  created: Date

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  description: string

  @Field()
  @Column({ default: 0 })
  followersCount: number

  @Field()
  @Column({ default: '' })
  actual: string

  @Field(type => [String])
  @Column({ default: [] })
  patches: string[]

  @Field(type => [String])
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
