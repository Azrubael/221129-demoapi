import { injectable } from 'inversify'
import { Logger } from 'tslog'
import { ILogger } from './logger-interface'
import 'reflect-metadata'

// Абстракция над логгером, которая нужна чтобы скрыть настройки конфигурации
// а также для обработки side-effects
// конкретное применение интерфейса ILogger
@injectable()
export class LoggerService implements ILogger {
	public logger: Logger

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		})
	}

	log(...args: unknown[]): void {
		this.logger.info(...args)
	}

	error(...args: unknown[]): void {
		// отправка в sentry / rollbar
		this.logger.error(...args)
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args)
	}
}
