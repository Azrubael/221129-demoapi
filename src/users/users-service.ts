import { UserModel } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { IConfigService } from '../config/config-service-interface'
import { TYPES } from '../types'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { UserEntity } from './user-entity'
import { IUsersRepository } from './users-repository-interface'
import { IUserService } from './users-service-interface'

// здесь собственно и должна находиться бизнес-логика:
// провека наличия пользователя в репозитории,
// получение его реквизитов или его создание
@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
	) {}
	async createUser({
		email,
		name,
		password,
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new UserEntity(email, name)
		const salt = this.configService.get('SALT')
		// console.log(`SALT = ${salt}`)
		await newUser.setPassword(password, Number(salt))
		// пользователь есть? есть - возвращаем null, иначе создаем пользователя
		const existedUser = await this.usersRepository.find(email)
		if (existedUser) {
			return null
		}
		return this.usersRepository.create(newUser)
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email)
		if (!existedUser) {
			return false
		}
		const newUser = new UserEntity(
			existedUser.email,
			existedUser.name,
			existedUser.password
		)
		return newUser.comparePassword(password)
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email)
	}
}
