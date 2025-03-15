// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RawMaterialLot {
    struct Lot {
        string lotName;
        uint quantity;
        string expirationDate;
        string certification;
        uint temperature;
        uint humidity;
    }

    Lot[] public lots;
    address public owner;

    event LotAdded(
        string lotName,
        uint quantity,
        string expirationDate,
        string certification,
        uint temperature,
        uint humidity
    );

    // Add visibility to the constructor
    constructor() public {
        owner = msg.sender;
    }

    function addLot(
        string memory _lotName,
        uint _quantity,
        string memory _expirationDate,
        string memory _certification,
        uint _temperature,
        uint _humidity
    ) public {
        Lot memory newLot = Lot({
            lotName: _lotName,
            quantity: _quantity,
            expirationDate: _expirationDate,
            certification: _certification,
            temperature: _temperature,
            humidity: _humidity
        });

        lots.push(newLot);
        emit LotAdded(_lotName, _quantity, _expirationDate, _certification, _temperature, _humidity);
    }

    function getLotCount() public view returns (uint) {
        return lots.length;
    }

    function getLot(uint index) public view returns (
        string memory lotName,
        uint quantity,
        string memory expirationDate,
        string memory certification,
        uint temperature,
        uint humidity
    ) {
        Lot memory lot = lots[index];
        return (
            lot.lotName,
            lot.quantity,
            lot.expirationDate,
            lot.certification,
            lot.temperature,
            lot.humidity
        );
    }
}
