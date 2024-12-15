import { ethers } from "ethers";
import React, { useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const CreateInheritanceContract = () => {
  const [inheritorAddress, setInheritorAddress] = useState<string>("");

  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const ABI = ["function createInheritance(address) public"];

  async function createInheritanceContract() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS || "",
          ABI,
          signer
        );

        const createInheritanceContract = await contract.createInheritance(
          inheritorAddress
        );

        const receipt = await createInheritanceContract.wait();

        console.log(receipt);
      } catch (error) {
        console.error("Error launching Inheritance Contract:", error);
        alert(
          "An error occurred while launching Inheritance Contract. Check console for details."
        );
      }
    }
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Inheritor Address"
          onChange={(e) => setInheritorAddress(e.target.value)}
        />
      </div>

      <button onClick={() => createInheritanceContract()}>
        Create Inheritance Contract
      </button>
    </div>
  );
};

export default CreateInheritanceContract;
