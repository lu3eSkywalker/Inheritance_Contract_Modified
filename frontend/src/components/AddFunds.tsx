import { ethers } from "ethers";
import React, { useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const AddFunds = () => {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [ethValue, setETHValue] = useState<string>("");

  const ABI = ["function deposit() public"];

  async function depositFunds() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress || "",
          ABI,
          signer
        );

        const ethValueToInt = parseInt(ethValue);

        const depositFunds = await contract.deposit({
          value: ethValueToInt,
        });

        const receipt = await depositFunds.wait();
        console.log(receipt);
      } catch (error) {
        console.error("Error Adding funds in the contract", error);
        alert(
          "An error occurred while adding funds in contract. Check console for details."
        );
      }
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Inherit Contract Address"
          onChange={(e) => setContractAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="ETH Value in Wei"
          onChange={(e) => setETHValue(e.target.value)}
        />
      </div>

      <button onClick={() => depositFunds()}>Add Funds</button>
    </div>
  );
};

export default AddFunds;