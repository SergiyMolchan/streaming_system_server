import { HttpStatus } from '@nestjs/common'

export interface Response<Data = any> {
    statusCode?: HttpStatus,
    data: Data | any,
    message: string
    error?: string
}