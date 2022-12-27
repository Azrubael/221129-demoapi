import { inject, injectable } from 'inversify'
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv'
import { IConfigService } from './config-service-interface'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger-interface'

// Загрузка конфигурации БД
@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config()
		if (result.error) {
			this.logger.error(
				'[ConfigsService] Не удалось прочитать файл .env или он отсутствует'
			)
		} else {
			this.logger.log('[CongigService] Конфигурация .env загружена')
			this.config = result.parsed as DotenvParseOutput
		}
	}

	get(key: string): string {
		return this.config[key]
	}
}
