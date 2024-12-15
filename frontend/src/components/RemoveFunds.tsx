import { ethers } from "ethers";
import React, { useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const RemoveFunds = () => {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [ethValue, setETHValue] = useState<string>("");
  const ABI = ["function removeETH(uint) public"];

  async function removeFunds() {
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

        const removeFunds = await contract.removeETH(ethValueToInt);

        const receipt = await removeFunds.wait();
        console.log(receipt);
      } catch (error) {
        console.error("Error Removing funds from the contract", error);
        alert(
          "An error occurred while Removing funds from contract. Check console for details."
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

      <button onClick={() => removeFunds()}>Add Funds</button>
    </div>
  );
};

export default RemoveFunds;