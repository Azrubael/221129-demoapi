import { inject, injectable } from 'inversify'
import { IConfigService } from '../config/config-service-interface'
import { TYPES } from '../types'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { UserEntity } from './user-entity'
import { IUserService } from './users-service-interface'

// здесь собственно и должна находиться бизнес-логика:
// провека наличия пользователя в репозитории,
// получение его реквизитов или его создание
@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {}
	async createUser({
		email,
		name,
		password,
	}: UserRegisterDto): Promise<UserEntity | null> {
		const newUser = new UserEntity(email, name)
		const salt = this.configService.get('SALT')
		console.log(`SALT = ${salt}`)
		await newUser.setPassword(password, Number(salt))
		// пользователь есть? есть - возвращаем null, иначе создаем пользователя
		return null
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true
	}
}
