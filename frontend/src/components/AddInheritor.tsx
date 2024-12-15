import { ethers } from "ethers";
import React, { useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const AddInheritor = () => {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [inheritorAddress, setInheritorAddress] = useState<string>("");

  const ABI = ["function addInheritor(address) public"];

  async function addInheritor() {
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

        const addInheritor = await contract.addInheritor(inheritorAddress);

        const receipt = await addInheritor.wait();
        console.log(receipt);
      } catch (error) {
        console.error("Error adding inheritors to the contract", error);
        alert(
          "An error occurred while adding inheritors to the contract. Check console for details."
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

      <button onClick={() => addInheritor()}>Add Funds</button>
    </div>
  );
};

export default AddInheritor;