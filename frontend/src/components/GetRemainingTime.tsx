import { ethers } from "ethers";
import React, { useState } from "react";

const GetRemainingTime = () => {
  const [contractAddress, setContractAddress] = useState<string>("0xd7e1C724465a8818e045e7E323609C3158D7dd98");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const ABI = ["function getRemainingTime() public view returns(uint)"];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(contractAddress || "", ABI, provider);

  async function getRemainingTime() {
    const getInfo = await contract.getRemainingTime();
    console.log("Time Remaining: ", parseInt(getInfo) / 60, "Minute");
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
      <button onClick={() => getRemainingTime()}>Get Remaining Time</button>
    </div>
  );
};

export default GetRemainingTime;