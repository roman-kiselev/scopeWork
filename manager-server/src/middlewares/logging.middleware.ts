import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    logger = new Logger('Response');

    constructor() {}
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl: url } = req;
        const reqTime = new Date().getTime();
        // req.on('close', () => {
        //     console.log('ReqClose - 1');
        // });
        // req.on('data', () => {
        //     console.log('ReqData - 2');
        // });
        // req.on('end', () => {
        //     console.log('ReqEnd - 3');
        // });
        // req.on('error', () => {
        //     console.log('ReqError - 4');
        // });
        // req.on('pause', () => {
        //     console.log('ReqPause - 5');
        // });
        // req.on('readable', () => {
        //     console.log('ReqReadable - 6');
        // });
        // req.on('resume', () => {
        //     console.log('ReqResume - 7');
        // });

        // res.on('close', () => {
        //     console.log('ResClose - 1');
        // });
        // res.on('drain', () => {
        //     console.log('ResDrain - 2');
        // });
        // res.on('error', () => {
        //     console.log('ResError - 3');
        // });
        // res.on('finish', () => {
        //     console.log('ResFinish - 4');
        // });
        // res.on('pipe', () => {
        //     console.log('ResPipe - 5');
        // });
        // res.on('unpipe', () => {
        //     console.log('ResUnPipe - 5');
        // });

        req.on('close', () => {
            this.logRequest(req, res, reqTime);
        });
        res.on('finish', () => {
            this.logResponse(req, res, reqTime);
        });
        next();
    }

    private logRequest(req: Request, res: Response, reqTime: number) {
        const { method, url, body, statusCode, params, query } = req;
        const { method: reqMethod } = req;

        if (reqMethod === 'GET') {
            this.logger.log(
                `${method} ${url} ${statusCode} ${new Date().getTime() - reqTime}ms Params-${JSON.stringify(params)} Query-${JSON.stringify(query)} StatusCode-${statusCode}`,
            );
        } else if (reqMethod === 'POST') {
            this.logger.log(
                `${method} ${url} StatusCode-${statusCode} ${new Date().getTime() - reqTime}ms ${JSON.stringify(body)}`,
            );
        }
    }

    private logResponse(req: Request, res: Response, reqTime: number) {
        const { method, url } = req;
        const { statusCode } = res;
        const resTime = new Date().getTime();

        if (statusCode === 201 || statusCode === 200) {
            this.logger.log(
                `${method} ${url} StatusCode-${statusCode} - ${resTime - reqTime}ms`,
            );
        }
    }
}
