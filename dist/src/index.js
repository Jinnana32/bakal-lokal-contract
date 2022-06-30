"use strict";
/**
 * Module for the REST endpoints.
 * @module rest
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const node_util_1 = __importDefault(require("node:util"));
const cors_1 = __importDefault(require("cors"));
const chain = __importStar(require("./blockchain"));
/**
 * After running the server, try the following curl commands to see it work.
 */
function startServer(config) {
    return __awaiter(this, void 0, void 0, function* () {
        // https://nodejs.org/api/net.html#serverlistenoptions-callback
        const server = {
            host: '0.0.0.0',
            port: 8080,
        };
        let corsOptions = {
            origin: function (origin, callback) {
                if (config.ORIGINS.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                }
                else {
                    callback(new Error('not allowed by CORS'));
                }
            },
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            preflightContinue: false,
        };
        let app = (0, express_1.default)();
        app.use((0, cors_1.default)(corsOptions), express_1.default.json());
        app.get('/', (req, res) => {
            res.send('Server is running.');
        });
        app.post('v1/bkl/record', (req, res) => {
            let { record } = req.body;
            try {
                chain.addNewDailyRecord(record);
            }
            catch (err) {
                console.error(err);
            }
        });
        app.listen(server, () => {
            console.log(node_util_1.default.format(`Server is listening at ${server.host}:${server.port}`, server.host, server.port));
        });
    });
}
exports.startServer = startServer;
