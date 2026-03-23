
import React, { useState } from 'react';

interface PaymentFormProps {
  onSubmit: (recipient: string, amount: number) => void;
  isMining: boolean;
}

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

export const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, isMining }) => {
  const [recipient, setRecipient] = useState<string>('0xRecipientAddress');
  const [amount, setAmount] = useState<string>('10.5');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!recipient.trim()) {
      setError('Recipient address is required.');
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid, positive amount.');
      return;
    }
    setError('');
    onSubmit(recipient, numericAmount);
    // Do not clear form to allow for quick re-submissions with modifications
  };

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">Create New Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-slate-300 mb-1">
            Recipient Address
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={isMining}
            className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="e.g., 0x..."
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-300 mb-1">
            Amount (ETH)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isMining}
            step="0.01"
            className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="0.00"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isMining}
          className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          <SendIcon className="w-5 h-5 mr-2"/>
          {isMining ? 'Processing...' : 'Send Payment'}
        </button>
      </form>
    </div>
  );
};
