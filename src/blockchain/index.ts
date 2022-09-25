import { ethers, BytesLike } from "ethers";
import contractABI from "../../abi.json";

export let smartContract: ethers.Contract;
export let signer: ethers.Wallet;

export async function init(privKey: BytesLike, contractAddress: string) {
  if (smartContract) {
    return;
  }

  const bscProvider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/",
    { name: "binance", chainId: 56 }
  );
  signer = new ethers.Wallet(privKey, bscProvider);
  smartContract = new ethers.Contract(contractAddress, contractABI, signer);
}

export async function addNewDailyRecord(jsonString: string) {
  const buffer = Buffer.from(jsonString);
  const record = buffer.toString("base64");
  await smartContract.functions.addRecord(record);
}

export async function getRecordsLength(): Promise<number> {
  let result = await smartContract.functions.getRecordLength();
  return result[0];
}

export async function getRecordByIndex(
  index: number
): Promise<[number, string]> {
  const results = await smartContract.functions.getRecord(index);
  return [results[0], results[1]];
}
