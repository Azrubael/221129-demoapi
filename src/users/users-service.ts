import { injectable } from 'inversify'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { UserEntity } from './user-entity'
import { IUserService } from './users-service-interface'

// здесь собственно и должна находиться бизнес-логика:
// провека наличия пользователя в репозитории,
// получение его реквизитов или его создание
@injectable()
export class UserService implements IUserService {
	async createUser({
		email,
		name,
		password,
	}: UserRegisterDto): Promise<UserEntity | null> {
		const newUser = new UserEntity(email, name)
		await newUser.setPassword(password, 10)
		// пользователь есть? есть - возвращаем null, иначе создаем пользователя
		return null
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true
	}
}
