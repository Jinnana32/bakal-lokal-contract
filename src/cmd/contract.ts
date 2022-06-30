import * as chain from '../blockchain'
import dotenv from 'dotenv';
import { BytesLike } from 'ethers/lib/ethers';

const main =  async () => {
    dotenv.config();

    const privKey: BytesLike = process.env.PRIVATE_KEY as BytesLike;
    const contractAddress: string = process.env.CONTRACT_ADDRESS as string;
    chain.initChain(privKey, contractAddress);

    // write to contract
    try {
        console.log('saving test record...')
        let randomNumber = Math.floor(Math.random() * 100)
        let testRecord = { data: `test data ${randomNumber}` };
        await chain.addNewDailyRecord(JSON.stringify(testRecord));
        console.log('test record saved!')
    } catch (err: any) {
        console.error(err);
    }

    // read data
    try {
        let records = [];

        console.log('fetching record length...')
        let recordLength = await chain.getRecordsLength();
        console.log(`Record length ${recordLength}`);

        console.log('fetching actual records...')
        for(let x = 0; x < recordLength; x++){
            let record = await chain.getRecordByIndex(x);
            records.push(record);
        }
        console.log(`Records fetched:`, records);
    } catch (err: any) {
        console.error(err);
    }
}

main();