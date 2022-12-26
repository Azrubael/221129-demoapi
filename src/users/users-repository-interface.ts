import { UserEntity } from './user-entity'
import { UserModel } from '@prisma/client'

export interface IUsersRepository {
	// метод создания нового пользователя
	create: (user: UserEntity) => Promise<UserModel>
	find: (email: string) => Promise<UserModel | null>
}
