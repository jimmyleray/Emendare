import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'
import { Field, ObjectType, ID } from 'type-graphql'
import { Results, Argument, Rules } from '../types'

const oneSecond = 1000
const oneMinute = oneSecond * 60
const oneHour = oneMinute * 60
const oneDay = oneHour * 24

@ObjectType()
@Entity()
export class Amend extends BaseEntity {
  @Field(type => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field()
  @Column({ default: Date.now })
  created: Date

  @Field()
  @Column()
  finished: Date

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ default: '' })
  description: string

  @Field()
  @Column()
  patch: string

  @Field()
  @Column({ default: 0 })
  version: number

  @Field()
  @Column()
  text: string

  @Field()
  @Column()
  totalPotentialVotesCount: number

  @Field()
  @Column({ default: false })
  closed: boolean

  @Field()
  @Column({ default: false })
  accepted: boolean

  @Field()
  @Column({ default: false })
  conflicted: boolean

  @Field(type => Results)
  @Column()
  results: Results

  @Field(type => [Argument])
  @Column({ default: [] })
  arguments: Argument[]

  @Field(type => Rules)
  @Column()
  rules: Rules

  constructor(
    name: string,
    description: string,
    patch: string,
    textId: string,
    version: number
  ) {
    super()
    this.name = name
    this.description = description
    this.patch = patch
    this.text = textId
    this.version = version
    this.created = new Date(Date.now())
    this.closed = false
    this.accepted = false
    this.conflicted = false
    this.results = new Results()
    this.arguments = []
    this.rules = new Rules(
      process.env.NODE_ENV === 'production' ? oneDay : oneMinute
    )
  }
}
