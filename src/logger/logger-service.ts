import { Logger } from "tslog"

// Абстракция над логгером, которая нужна чтобы скрыть настройки конфигурации
// а также для обработки side-effects
export class LoggerService {
   public logger: Logger

   constructor() {
      this.logger = new Logger({
         displayInstanceName: false,
         displayLoggerName: false,
         displayFilePath: 'hidden',
         displayFunctionName: false
      })
   }

   log(...args: unknown[]) {
      this.logger.info(...args)
   }

   
   error(...args: unknown[]) {
      // отправка в sentry / rollbar
      this.logger.error(...args)
   }

   
   warn(...args: unknown[]) {
      this.logger.warn(...args)
   }

}