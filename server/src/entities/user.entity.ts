import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Notification, ArgumentID } from '../common'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(type => ID)
  @ObjectIdColumn()
  id: ObjectID

  @Field()
  @Column()
  email: string

  @Field()
  @Column()
  password: string

  @Field()
  @Column({ default: process.env.NODE_ENV !== 'production' })
  activated: boolean

  @Field()
  @Column({ default: new Date(Date.now()) })
  created: Date

  @Field()
  @Column({ default: new Date(Date.now()) })
  lastEventDate: Date

  @Field()
  @Column({ default: null })
  activationToken: string

  @Field(type => [String])
  @Column({ default: [] })
  followedTexts: string[]

  @Field(type => [String])
  @Column({ default: [] })
  upVotes: string[]

  @Field(type => [String])
  @Column({ default: [] })
  indVotes: string[]

  @Field(type => [String])
  @Column({ default: [] })
  downVotes: string[]

  @Field(type => Notification)
  @Column()
  notifications: Notification

  @Field(type => [ArgumentID])
  @Column({ default: [] })
  argumentUpVotes: ArgumentID[]

  @Field(type => [ArgumentID])
  @Column({ default: [] })
  argumentDownVotes: ArgumentID[]

  constructor(email: string, password: string, activationToken: string) {
    super()
    this.email = email
    this.password = password
    this.activationToken = activationToken
    this.activated = process.env.NODE_ENV !== 'production'
    this.created = new Date(Date.now())
    this.lastEventDate = new Date(Date.now())
    this.followedTexts = []
    this.notifications = new Notification()
    this.indVotes = []
    this.upVotes = []
    this.downVotes = []
    this.argumentDownVotes = []
    this.argumentUpVotes = []
  }
}
