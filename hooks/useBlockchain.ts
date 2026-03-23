
import { useState, useEffect, useCallback } from 'react';
import type { Block, Transaction } from '../types';

const DIFFICULTY = 4; // Number of leading zeros for a valid hash
const MINING_REWARD_SENDER = "0xSystem";
const MINING_REWARD_ADDRESS = "0xMinerAddress";
const MINING_REWARD = 10;

// Helper to calculate SHA-256 hash using the Web Crypto API
const calculateHash = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const useBlockchain = () => {
  const [chain, setChain] = useState<Block[]>([]);
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);
  const [isMining, setIsMining] = useState<boolean>(false);
  const [miningStatusMessage, setMiningStatusMessage] = useState<string>('Ready to process transactions.');

  const createGenesisBlock = async () => {
    const genesisTransactions: Transaction[] = [];
    const blockData = {
      index: 0,
      timestamp: Date.now(),
      transactions: genesisTransactions,
      previousHash: "0",
      nonce: 0,
    };
    const hash = await calculateHash(`${blockData.index}${blockData.previousHash}${blockData.timestamp}${JSON.stringify(blockData.transactions)}${blockData.nonce}`);
    const genesisBlock: Block = { ...blockData, hash };
    setChain([genesisBlock]);
  };

  useEffect(() => {
    createGenesisBlock();
  }, []);

  const minePendingTransactions = useCallback(async () => {
    if (pendingTransactions.length === 0) return;
    
    setIsMining(true);
    setMiningStatusMessage('Starting mining process...');

    // Add mining reward transaction
    const rewardTx: Transaction = {
        sender: MINING_REWARD_SENDER,
        recipient: MINING_REWARD_ADDRESS,
        amount: MINING_REWARD,
        timestamp: Date.now(),
    };
    const transactionsToMine = [...pendingTransactions, rewardTx];

    const lastBlock = chain[chain.length - 1];
    const newBlockData = {
      index: chain.length,
      timestamp: Date.now(),
      transactions: transactionsToMine,
      previousHash: lastBlock.hash,
    };
    
    let nonce = 0;
    let hash = '';
    const difficultyPrefix = '0'.repeat(DIFFICULTY);

    await new Promise<void>(resolve => setTimeout(async () => {
        setMiningStatusMessage('Calculating proof-of-work...');
        while (!hash.startsWith(difficultyPrefix)) {
            nonce++;
            const dataString = `${newBlockData.index}${newBlockData.previousHash}${newBlockData.timestamp}${JSON.stringify(newBlockData.transactions)}${nonce}`;
            hash = await calculateHash(dataString);
            
            // Visual effect: slowdown and update status to show work
            if (nonce % 100 === 0) {
                setMiningStatusMessage(`Mining... Hashing Nonce: ${nonce}`);
                await new Promise(r => setTimeout(r, 1));
            }
        }

        const newBlock: Block = { ...newBlockData, nonce, hash };
        
        setChain(prev => [...prev, newBlock]);
        setPendingTransactions([]);
        setIsMining(false);
        setMiningStatusMessage(`Block #${newBlock.index} successfully mined!`);
        setTimeout(() => setMiningStatusMessage('Ready to process transactions.'), 4000);
        resolve();
    }, 500)); // Short delay to allow UI update before heavy computation
    
  }, [pendingTransactions, chain]);


  const addTransaction = async (sender: string, recipient: string, amount: number) => {
    const newTransaction: Transaction = {
      sender,
      recipient,
      amount,
      timestamp: Date.now(),
    };
    const updatedPendingTransactions = [...pendingTransactions, newTransaction];
    setPendingTransactions(updatedPendingTransactions);
    
    // Auto-start mining when a transaction is added
    if (updatedPendingTransactions.length > 0 && !isMining) {
      // Use a timeout to batch multiple quick transactions
      setTimeout(() => {
          minePendingTransactions();
      }, 1000);
    }
  };

  const validateChain = useCallback(async (): Promise<boolean> => {
    for (let i = 0; i < chain.length; i++) {
      const currentBlock = chain[i];
      const previousBlock = i > 0 ? chain[i - 1] : null;

      // Re-calculate hash to ensure data hasn't been tampered with
      const dataString = `${currentBlock.index}${currentBlock.previousHash}${currentBlock.timestamp}${JSON.stringify(currentBlock.transactions)}${currentBlock.nonce}`;
      const calculatedHash = await calculateHash(dataString);

      if (currentBlock.hash !== calculatedHash) {
        console.warn(`Block #${currentBlock.index} invalid: Calculated ${calculatedHash} !== Stored ${currentBlock.hash}`);
        return false;
      }

      // Check if previousHash matches the hash of the previous block
      if (previousBlock) {
        if (currentBlock.previousHash !== previousBlock.hash) {
            console.warn(`Block #${currentBlock.index} broken link: Previous hash ${currentBlock.previousHash} !== ${previousBlock.hash}`);
            return false;
        }
      } else {
         // Genesis block check
         if (currentBlock.previousHash !== "0") {
             return false;
         }
      }
    }
    return true;
  }, [chain]);

  const clearPendingTransactions = useCallback(() => {
    setPendingTransactions([]);
    setMiningStatusMessage('Pending transactions cleared.');
    setTimeout(() => setMiningStatusMessage('Ready to process transactions.'), 2000);
  }, []);

  return { chain, pendingTransactions, isMining, addTransaction, miningStatusMessage, validateChain, clearPendingTransactions };
};
