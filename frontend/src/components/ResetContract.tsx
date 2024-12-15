import { ethers } from "ethers";
import React, { useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const ResetContract = () => {
  const [contractAddress, setContractAddress] = useState<string>(
    "0x728692C4936c2b6e24300dda3190B123A669EDb3"
  );

  const ABI = ["function resetContractTime() public"];

  async function resetContract() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress || "", ABI, signer);

        const resetContract = await contract.resetContractTime();
        const receipt = await resetContract.wait();
        console.log(receipt);
      } catch (error) {
        console.error("Error resetting contract", error);
        alert(
          "An error occurred while resetting contract. Check console for details."
        );
      }
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
      </div>

      <button onClick={() => resetContract()}>
        Create Inheritance Contract
      </button>
    </div>
  );
};

export default ResetContract;