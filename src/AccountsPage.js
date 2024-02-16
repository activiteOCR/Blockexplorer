import React, { useState } from "react";
import { Alchemy, Network, Utils } from "alchemy-sdk";

// Assuming the Alchemy settings are the same as previously defined
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function AccountsPage() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCheckBalance = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setLoading(true);
    try {
      // Get the ethers provider from the Alchemy SDK
      //const ethersProvider = alchemy.config.getProvider();
      const weiBalance = await alchemy.core.getBalance(address);
      // Use ethers utility function to format the balance
      const etherBalance = Utils.formatEther(weiBalance);
      setBalance(etherBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Check Account Balance</h2>
      <form onSubmit={handleCheckBalance}>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter Ethereum address"
          style={{ marginRight: "10px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Check Balance"}
        </button>
      </form>
      {balance !== null && <p>Balance: {balance} ETH</p>}
    </div>
  );
}

export default AccountsPage;
