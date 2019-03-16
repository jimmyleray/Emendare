import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Register } from '../entities'

@Injectable()
export class RegisterService {
  constructor(
    @Inject('RegisterRepositoryToken')
    private readonly registerRepository: Repository<Register>,
  ) {}

  async findAll(): Promise<Register[]> {
    return await this.registerRepository.find()
  }
}
