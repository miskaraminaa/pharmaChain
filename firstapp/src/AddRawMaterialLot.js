import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import RawMaterialLot from './artifacts/RawMaterialLot.json'; // Update the path if needed

import './styles.css';

function AddRawMaterialLot() {
    const [lotName, setLotName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [certification, setCertification] = useState('');
    const [iotData, setIotData] = useState({
        temperature: '',
        humidity: ''
    });
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                try {
                    // Request wallet connection
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    // Create Web3 instance
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    // Get accounts from MetaMask
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccounts(accounts);

                    // Get the network and contract details
                    const networkId = await web3Instance.eth.net.getId();
                    const deployedNetwork = RawMaterialLot.networks[networkId];
                    const contractInstance = new web3Instance.eth.Contract(
                        RawMaterialLot.abi,
                        deployedNetwork && deployedNetwork.address
                    );
                    setContract(contractInstance);
                } catch (error) {
                    alert("Please connect your wallet!");
                    console.error("Error connecting to MetaMask:", error);
                }
            } else {
                alert("Please install MetaMask!");
            }
        };

        initWeb3();
    }, []);

    const handleSubmit = async () => {
        if (!web3 || !contract || !accounts.length) {
            alert("Please connect your wallet!");
            return;
        }

        try {
            await contract.methods.addLot(
                lotName,
                quantity,
                expirationDate,
                certification,
                iotData.temperature,
                iotData.humidity
            ).send({ from: accounts[0] });

            alert("Lot added and certified!");
            console.log({ lotName, quantity, expirationDate, certification, iotData });
        } catch (error) {
            console.error("Error adding lot:", error);
            alert("Error adding lot!");
        }
    };

    return (
        <div className="addRawMaterialLotContainer">
            <div className="addRawMaterialLotContent">
                <h2>Add a Raw Material Lot</h2>
                <form>
                    <div>
                        <label>Lot Name:</label>
                        <input
                            type="text"
                            value={lotName}
                            onChange={(e) => setLotName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Expiration Date:</label>
                        <input
                            type="date"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Origin and Analysis Certificate:</label>
                        <textarea
                            value={certification}
                            onChange={(e) => setCertification(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <h3>IoT Monitoring (Storage Conditions)</h3>
                        <label>Temperature (°C):</label>
                        <input
                            type="number"
                            value={iotData.temperature}
                            onChange={(e) => setIotData({ ...iotData, temperature: e.target.value })}
                            required
                        />
                        <label>Humidity (%):</label>
                        <input
                            type="number"
                            value={iotData.humidity}
                            onChange={(e) => setIotData({ ...iotData, humidity: e.target.value })}
                            required
                        />
                    </div>
                    <button className="fancyButton" type="button" onClick={handleSubmit}>
                        Add Lot
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddRawMaterialLot;
