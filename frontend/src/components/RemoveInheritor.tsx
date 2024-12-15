import { ethers } from "ethers";
import React, { useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const RemoveInheritor = () => {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [inheritorAddress, setInheritorAddress] = useState<string>("");

  const ABI = ["function removeInheritor(address) public"];

  async function removeInheritor() {
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

        const removeInheritor = await contract.removeInheritor(inheritorAddress);
        const receipt = await removeInheritor.wait();
        console.log(receipt);
      } catch (error) {
        console.error("Error removing inheritors to the contract", error);
        alert(
          "An error occurred while removing inheritors to the contract. Check console for details."
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

        <input
          type="text"
          placeholder="Inheritor Address"
          onChange={(e) => setInheritorAddress(e.target.value)}
        />
      </div>

      <button onClick={() => removeInheritor()}>Remove Inheritor</button>
    </div>
  );
};

export default RemoveInheritor;