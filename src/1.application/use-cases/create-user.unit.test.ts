import { sign } from 'crypto'
import User from '../../0.domain/entities/user'
import CreateUserRepository from '../interfaces/create-user-repository'
import { UserData } from '../types/user-types'
import CreateUserUseCase from './create-user'

const fakeData = {
  email: 'any_email',
  password: 'abc123'
}

const makeCreateUserRepositoryMock = (): CreateUserRepository => {
  class CreateUserRepositoryMock implements CreateUserRepository {
    async create (userData: UserData): Promise<User> {
      const fakeUser = {
        id: '999',
        email: 'any_mail@mail.com',
        password: 'abc123'
      }

      return new User(fakeUser)
    }
  }

  return new CreateUserRepositoryMock()
}

type SutTypes = {
  sut: CreateUserUseCase,
  createUserRepository: CreateUserRepository
}

const makeSut = (): SutTypes => {
  const injection = {
    createUserRepository: makeCreateUserRepositoryMock()
  }
  const sut = new CreateUserUseCase(injection)

  return { sut, ...injection }
}

describe('CreateUserUseCase', () => {
  it('calls CreateUserRepository with correct params', async () => {
    // Arrange
    const {sut, createUserRepository} = makeSut()
    const createSpy = jest.spyOn(createUserRepository, 'create')

    // Act
    await sut.execute(fakeData)

    // Assert
    expect(createSpy).toHaveBeenCalledWith(fakeData)
  })

  it('returns a new User', async () => {
    const { sut } = makeSut()

    const result = await sut.execute(fakeData)

    expect(result).toEqual({
      props: {
        id: '999',
        email: 'any_mail@mail.com',
        password: 'abc123'
      }
    })
  });
})