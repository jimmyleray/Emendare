import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'

const oneSecond = 1000
const oneMinute = oneSecond * 60
const oneHour = oneMinute * 60
const oneDay = oneHour * 24

@Entity()
export class Amend extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column({ default: Date.now })
  created: Date

  @Column()
  finished: Date

  @Column()
  name: string

  @Column({ default: '' })
  description: string

  @Column()
  patch: string

  @Column({ default: 0 })
  version: number

  @Column()
  text: string

  @Column()
  totalPotentialVotesCount: number

  @Column({ default: false })
  closed: boolean

  @Column({ default: false })
  accepted: boolean

  @Column({ default: false })
  conflicted: boolean

  @Column({
    default: {
      totalPotentialVotesCount: 0,
      upVotesCount: 0,
      downVotesCount: 0,
      indVotesCount: 0
    }
  })
  results: {
    totalPotentialVotesCount: number
    upVotesCount: number
    downVotesCount: number
    indVotesCount: number
  }
  @Column({ default: [] })
  arguments: Array<{
    id: ObjectID
    created: Date
    text: string
    type: string
    upVotesCount: number
  }>

  @Column({
    default: {
      delayMax: process.env.NODE_ENV === 'production' ? oneDay : oneMinute
    }
  })
  rules: {
    delayMax: number
  }

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
    this.results = {
      totalPotentialVotesCount: 0,
      upVotesCount: 0,
      downVotesCount: 0,
      indVotesCount: 0
    }
    this.arguments = []
    this.rules = {
      delayMax: process.env.NODE_ENV === 'production' ? oneDay : oneMinute
    }
  }
}
