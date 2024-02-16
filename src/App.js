import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY, // Ensure your API key is correctly set up
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [selectedBlockDetails, setSelectedBlockDetails] = useState(null);
  const [selectedTransactionDetails, setSelectedTransactionDetails] =
    useState(null);

  useEffect(() => {
    async function fetchLatestBlocks() {
      const currentBlockNumber = await alchemy.core.getBlockNumber();
      const blocks = [];
      for (let i = 0; i < 3; i++) {
        const blockDetail = await alchemy.core.getBlockWithTransactions(
          currentBlockNumber - i
        );
        blocks.push(blockDetail);
      }
      setLatestBlocks(blocks);
    }

    fetchLatestBlocks();
  }, []);

  const handleBlockClick = async (blockNumber) => {
    const blockDetail = await alchemy.core.getBlockWithTransactions(
      blockNumber
    );
    setSelectedBlockDetails(blockDetail);
    setSelectedTransactionDetails(null); // Reset transaction details when a new block is selected
  };

  const handleTransactionClick = async (txHash) => {
    const txDetail = await alchemy.core.getTransactionReceipt(txHash);
    setSelectedTransactionDetails(txDetail);
  };

  return (
    <div className="App">
      <div>
        <h2>Latest Blocks</h2>
        <ul>
          {latestBlocks.map((block) => (
            <li
              key={block.number}
              onClick={() => handleBlockClick(block.number)}
              style={{ cursor: "pointer" }}
            >
              Block Number: {block.number} - Miner: {block.miner} -
              Transactions: {block.transactions.length}
            </li>
          ))}
        </ul>
      </div>
      {selectedBlockDetails && (
        <div>
          <h2>Block Details (Block Number: {selectedBlockDetails.number})</h2>
          <p>
            <strong>Hash:</strong> {selectedBlockDetails.hash}
          </p>
          <p>
            <strong>Miner:</strong> {selectedBlockDetails.miner}
          </p>
          <p>
            <strong>Transaction Count:</strong>{" "}
            {selectedBlockDetails.transactions.length}
          </p>
          <h3>Transactions</h3>
          <ul>
            {selectedBlockDetails.transactions.map((tx, index) => (
              <li
                key={index}
                onClick={() => handleTransactionClick(tx.hash)}
                style={{ cursor: "pointer" }}
              >
                <strong>Hash:</strong> {tx.hash}
                <br />
                <strong>From:</strong> {tx.from} <br />
                <strong>To:</strong> {tx.to} <br />
                <strong>Value:</strong> {tx.value?.toString() || "0"} Wei
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedTransactionDetails && (
        <div>
          <h2>
            Transaction Details (Hash:{" "}
            {selectedTransactionDetails.transactionHash})
          </h2>
          <p>
            <strong>Block Number:</strong>{" "}
            {selectedTransactionDetails.blockNumber}
          </p>
          <p>
            <strong>From:</strong> {selectedTransactionDetails.from}
          </p>
          <p>
            <strong>To:</strong> {selectedTransactionDetails.to}
          </p>
          <p>
            <strong>Gas Used:</strong>{" "}
            {selectedTransactionDetails.gasUsed.toString()} Wei
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {selectedTransactionDetails.status ? "Success" : "Fail"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
