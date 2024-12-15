import { ethers } from "ethers";
import React, { useState } from "react";

const CheckInheritor = () => {
  const [contractAddress, setContractAddress] = useState<string>("0xd7e1C724465a8818e045e7E323609C3158D7dd98");
  const [inheritorAddress, setInheritorAddress] = useState<string>("0xd7e1C724465a8818e045e7E323609C3158D7dd98");
  
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const ABI = [
    "function getInheritorStatus(address) public view returns(bool)"
  ];
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(contractAddress || "", ABI, provider);

  async function checkInheritor() {
      try {
        const checkInheritor = await contract.getInheritorStatus(inheritorAddress);
        console.log(checkInheritor);
        console.log(checkInheritor.toString());
      } catch (error) {
        console.error("Error Checking inheritor status", error);
        alert(
          "An error occurred while checking inheritor status. Check console for details."
        );
      }
    }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Contract Address"
          onChange={(e) => setContractAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Inheritor Address"
          onChange={(e) => setInheritorAddress(e.target.value)}
        />
      </div>

      <button onClick={() => checkInheritor()}>Get Inheritor Status</button>
    </div>
  );
};

export default CheckInheritor;
