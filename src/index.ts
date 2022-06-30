/**
 * Module for the REST endpoints.
 * @module rest
 */

import express, { Request, Response } from 'express'
import util from 'node:util';
import cors, { CorsOptions } from 'cors';
import * as chain from './blockchain'


/**
 * After running the server, try the following curl commands to see it work.
 */
export async function startServer(config: Record<string, string | string[]>) {
    // https://nodejs.org/api/net.html#serverlistenoptions-callback
    const server = {
        host: '0.0.0.0',
        port: 8080,
    };

    let corsOptions = {
        origin: function (origin: string, callback: Function) {
            if (config.ORIGINS.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('not allowed by CORS'));
            }
        },
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        preflightContinue: false,
    };

    let app = express();
    app.use(cors(corsOptions as CorsOptions), express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send('Server is running.');
    });

    app.post('v1/bkl/record', (req: Request, res: Response) => {
        let { record } = req.body;
        try {
            chain.addNewDailyRecord(record);
        } catch (err: any) {
            console.error(err);
        }
    });

    app.listen(server, () => {
        console.log(util.format(`Server is listening at ${server.host}:${server.port}`, server.host, server.port));
    });

}
