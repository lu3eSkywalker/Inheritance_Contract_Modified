import { ethers } from "ethers";
import React, { useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const ContractsByUser = () => {
  const [userAddress, setUserAddress] = useState<string>("");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const ABI = [
    "function getInheritanceContractByUser(address) public view returns(address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS || "", ABI, provider);

  async function getInheritanceContractByUser() {
    const getInfo = await contract.getInheritanceContractByUser(userAddress);
    console.log(getInfo);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="User Address"
          onChange={(e) => setUserAddress(e.target.value)}
        />
      </div>

      <button onClick={() => getInheritanceContractByUser()}>
        Create Inheritance Contract
      </button>
    </div>
  );
};

export default ContractsByUser;
