// Core
import { isEmpty } from 'lodash';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const {  method, path: url, body } = request;

        response.on('close', () => {
            const { statusCode, statusMessage } = response;

            const isBody = isEmpty(body) ? '' : ` | ${JSON.stringify(body)}`;

            this.logger.log(
                `${method} ${url} ${statusCode} ${statusMessage}${isBody}`,
            );
        });

        next();
    }
}
