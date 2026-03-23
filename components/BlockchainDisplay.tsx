
import React from 'react';
import type { Block } from '../types';
import { BlockCard } from './BlockCard';

interface BlockchainDisplayProps {
  chain: Block[];
}

export const BlockchainDisplay: React.FC<BlockchainDisplayProps> = ({ chain }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700 h-[60vh] overflow-hidden">
      <div className="flex items-center space-x-8 overflow-x-auto pb-4 h-full">
        {chain.map((block, index) => (
          <div key={block.hash} className="flex items-center flex-shrink-0">
            <BlockCard block={block} isGenesis={index === 0} />
            {index < chain.length - 1 && (
              <div className="w-16 h-1 bg-cyan-500/50 relative">
                  <div className="absolute right-0 top-1/2 -mt-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
