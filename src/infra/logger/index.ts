import winston from 'winston'

class Message implements LogStructure {
    private level: string
    private value: string
    private metadata: any

    constructor(level: string, value: string, metadata: any) {
        this.level = level
        this.value = value
        this.metadata = metadata
    }

    public format() {
        const levelF = this.level.toUpperCase()
        const metadataF = JSON.stringify(this.metadata)
        return `[${levelF}] ${this.value} ${metadataF}`
    }
}

export default class Logger {
    private logger: winston.Logger

    constructor() {
        this.logger = winston.createLogger({
            transports: [new winston.transports.Console()],
            format: winston.format.printf((info) => {
                return info.message
            }),
        })
    }

    public info(message: any, metadata = {}) {
        const _message = new Message('info', message, metadata)
        this.logger.log('info', _message.format())
    }

    public debug(message: any, metadata = {}) {
        const _message = new Message('debug', message, metadata)
        this.logger.log('debug', _message.format())
    }

    public error(message: any, metadata = {}) {
        const _message = new Message('error', message, metadata)
        this.logger.log('error', _message.format())
    }
}
