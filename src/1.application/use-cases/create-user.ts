import User from '../../0.domain/entities/user'
import CreateUserRepository from '../interfaces/create-user-repository'
import { UserData } from '../types/user-types'

export default class CreateUserUseCase {
  constructor(private readonly props: {
    createUserRepository: CreateUserRepository
  }) {}

  async execute (userData: UserData): Promise<User> {
    const user = await this.props.createUserRepository.create(userData)

    return user
  }
}