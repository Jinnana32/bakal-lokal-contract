"use strict";
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
exports.getRecordByIndex = exports.getRecordsLength = exports.addNewDailyRecord = exports.initChain = exports.smartContract = void 0;
const ethers_1 = require("ethers");
const abi_json_1 = __importDefault(require("../../abi.json"));
function initChain() {
    if (exports.smartContract) {
        return;
    }
    const privKey = process.env.PRIVATE_KEY;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const bscNetwork = {
        name: 'Smart Chain - Testnet',
        chainId: 97,
    };
    const signer = new ethers_1.ethers.Wallet(privKey, ethers_1.providers.getDefaultProvider(bscNetwork));
    exports.smartContract = new ethers_1.ethers.Contract(contractAddress, abi_json_1.default, signer);
}
exports.initChain = initChain;
function addNewDailyRecord(jsonString) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = Buffer.from(jsonString);
        const record = buffer.toString('base64');
        yield exports.smartContract.smartContract.addRecord(record);
    });
}
exports.addNewDailyRecord = addNewDailyRecord;
function getRecordsLength() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.smartContract.smartContract.getRecordLength()[0];
    });
}
exports.getRecordsLength = getRecordsLength;
function getRecordByIndex(index) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield exports.smartContract.smartContract.getRecord(index);
        return [results[0], results[1]];
    });
}
exports.getRecordByIndex = getRecordByIndex;
