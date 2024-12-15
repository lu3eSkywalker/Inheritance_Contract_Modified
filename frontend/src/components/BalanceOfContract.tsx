import { ethers } from "ethers";
import React, { useState } from "react";

const BalanceOfContract = () => {
  const [contractAddress, setContractAddress] = useState<string>(
    "0xd7e1C724465a8818e045e7E323609C3158D7dd98"
  );

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const ABI = ["function getContractBalance() public view returns(uint)"];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(contractAddress || "", ABI, provider);

  async function getBalance() {
    const getBalance = await contract.getContractBalance();
    console.log(getBalance.toString());
    const balanceInWei = parseInt(getBalance.toString());

    console.log("Balance In ETH: ", balanceInWei / 1000000000000000000);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Inheritance Contract Address"
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </div>
      <button onClick={() => getBalance()}>Get Balance</button>
    </div>
  );
};

export default BalanceOfContract;