import { UserModel } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { PrismaService } from '../database/prisma-service'
import { TYPES } from '../types'
import { UserEntity } from './user-entity'
import { IUsersRepository } from './users-repository-interface'

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService
	) {}

	// Передавая объект UserEntity, мы получаем его свойства из БД
	async create({ email, password, name }: UserEntity): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		})
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: { email },
		})
	}
}
