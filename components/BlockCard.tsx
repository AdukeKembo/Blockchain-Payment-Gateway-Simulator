
import React from 'react';
import type { Block, Transaction } from '../types';

interface BlockCardProps {
  block: Block;
  isGenesis: boolean;
}

const HashDisplay: React.FC<{ label: string, hash: string }> = ({ label, hash }) => (
  <div className="text-xs">
    <span className="font-semibold text-slate-400">{label}: </span>
    <span className="font-mono text-emerald-400 break-all" title={hash}>
      {hash.substring(0, 10)}...{hash.substring(hash.length - 10)}
    </span>
  </div>
);

const TransactionItem: React.FC<{ tx: Transaction }> = ({ tx }) => (
    <div className="text-xs p-2 bg-slate-800 rounded-md">
        <p className="font-mono truncate"><span className="text-slate-400">From:</span> {tx.sender}</p>
        <p className="font-mono truncate"><span className="text-slate-400">To:</span> {tx.recipient}</p>
        <p className="font-bold text-cyan-400">{tx.amount} ETH</p>
    </div>
);


export const BlockCard: React.FC<BlockCardProps> = ({ block, isGenesis }) => {
  const cardColor = isGenesis 
    ? "border-purple-500/50 bg-purple-900/10" 
    : "border-cyan-500/50 bg-cyan-900/10";
  const headerColor = isGenesis ? "text-purple-400" : "text-cyan-400";
  
  return (
    <div className={`w-80 h-full flex flex-col rounded-lg shadow-md border-2 ${cardColor} transition-all duration-500`}>
      <div className={`p-3 border-b-2 ${cardColor}`}>
        <h4 className={`text-lg font-bold ${headerColor}`}>
          Block #{block.index} {isGenesis && "(Genesis)"}
        </h4>
        <p className="text-xs text-slate-500">{new Date(block.timestamp).toLocaleString()}</p>
      </div>
      
      <div className="p-3 space-y-2 overflow-y-auto flex-grow">
        <HashDisplay label="Hash" hash={block.hash} />
        <HashDisplay label="Prev Hash" hash={block.previousHash} />
        <div className="text-xs">
            <span className="font-semibold text-slate-400">Nonce: </span>
            <span className="font-mono text-slate-300">{block.nonce}</span>
        </div>
        
        <div className="pt-2">
            <h5 className="text-sm font-bold text-slate-300 mb-2 border-t border-slate-700 pt-2">
                Transactions ({block.transactions.length})
            </h5>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {block.transactions.length > 0 ? (
                    block.transactions.map((tx, i) => <TransactionItem key={i} tx={tx} />)
                ) : (
                    <p className="text-xs text-slate-500">No transactions in this block.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
