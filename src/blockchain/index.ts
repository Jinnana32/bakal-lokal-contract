import { ethers, providers, BytesLike } from "ethers";
import contractABI from '../../abi.json';

export let smartContract: ethers.Contract;

export function initChain(privKey: BytesLike, contractAddress: string){
    if(smartContract) {
        return;
    }

    const bscNetwork = `https://data-seed-prebsc-1-s1.binance.org:8545/`;
    const signer = new ethers.Wallet(
        privKey,
        providers.getDefaultProvider(bscNetwork)
    );
    
    smartContract = new ethers.Contract(contractAddress, contractABI, signer);
}

export async function addNewDailyRecord(jsonString: string) {
    const buffer = Buffer.from(jsonString);
    const record = buffer.toString('base64');
    await smartContract.functions.addRecord(record);
}

export async function getRecordsLength() : Promise<number> {
    let result = await smartContract.functions.getRecordLength();
    return result[0];
}

export async function getRecordByIndex(index: number) : Promise<[number, string]> {
    const results = await smartContract.functions.getRecord(index);
    return [results[0], results[1]];
}
