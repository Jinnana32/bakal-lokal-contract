// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract BklDailyRecordContract {

   struct DailyRecord { 
      uint createdAt;
      string jsonData;
   }

   int recordIndexCounter = 0;
   DailyRecord[] private _records;

    /**
     * @dev Store value in variable
     * @param json value to store
     */
    function addRecord(string memory json) public {
        DailyRecord memory record = DailyRecord(block.timestamp, json);
        _records.push(record);
        recordIndexCounter += 1;
    }

    function getRecordLength() public view returns(uint256) {
        return _records.length;
    }

    function getRecord(uint256 index) public view returns(uint256, string memory) {
        return (_records[index].createdAt, _records[index].jsonData);
    }

}