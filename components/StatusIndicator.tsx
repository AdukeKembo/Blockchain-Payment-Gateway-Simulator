
import React from 'react';

interface StatusIndicatorProps {
  isMining: boolean;
  pendingCount: number;
  statusMessage: string;
}

const MiningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
  </svg>
);

const PendingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isMining, pendingCount, statusMessage }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">Network Status</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-900 rounded-md">
          <div className="flex items-center">
            <PendingIcon className="w-6 h-6 mr-3 text-amber-400" />
            <span className="font-semibold text-slate-300">Pending Transactions:</span>
          </div>
          <span className="font-mono text-2xl font-bold text-amber-400">{pendingCount}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-900 rounded-md">
          <div className="flex items-center">
             {isMining ? (
                <MiningIcon className="w-6 h-6 mr-3 text-emerald-400 animate-pulse" />
             ) : (
                <MiningIcon className="w-6 h-6 mr-3 text-slate-500" />
             )}
            <span className="font-semibold text-slate-300">Current Activity:</span>
          </div>
        </div>
         <div className="text-center p-3 bg-slate-900/50 rounded-md min-h-[50px] flex items-center justify-center">
            <p className={`text-sm font-medium transition-colors duration-300 ${isMining ? 'text-emerald-400' : 'text-slate-400'}`}>
                {statusMessage}
            </p>
         </div>
      </div>
    </div>
  );
};
