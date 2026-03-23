
import React, { useState } from 'react';
import { Header } from './components/Header';
import { PaymentForm } from './components/PaymentForm';
import { BlockchainDisplay } from './components/BlockchainDisplay';
import { StatusIndicator } from './components/StatusIndicator';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { useBlockchain } from './hooks/useBlockchain';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const {
    chain,
    pendingTransactions,
    isMining,
    addTransaction,
    miningStatusMessage,
    validateChain,
    clearPendingTransactions
  } = useBlockchain();

  const [validationResult, setValidationResult] = useState<{valid: boolean; message: string} | null>(null);

  const handleTransactionSubmit = async (recipient: string, amount: number) => {
    // In a real app, sender would be from a user's wallet
    const sender = currentUser ? `0x${currentUser}Wallet` : "0xYourWalletAddress"; 
    await addTransaction(sender, recipient, amount);
  };

  const handleValidateChain = async () => {
      setValidationResult({ valid: true, message: "Verifying..." });
      const isValid = await validateChain();
      if (isValid) {
          setValidationResult({ valid: true, message: "Blockchain is valid & secure! ✅" });
      } else {
          setValidationResult({ valid: false, message: "Blockchain integrity compromised! ❌" });
      }
      setTimeout(() => setValidationResult(null), 3000);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8 flex flex-col">
        <div className="container mx-auto flex-grow flex flex-col">
          <Header />
          <div className="flex-grow flex items-center justify-center">
            {authMode === 'signin' ? (
              <SignInForm 
                onSignIn={setCurrentUser} 
                onSwitchToSignUp={() => setAuthMode('signup')} 
              />
            ) : (
              <SignUpForm 
                onSignUp={setCurrentUser} 
                onSwitchToSignIn={() => setAuthMode('signin')} 
              />
            )}
          </div>
          <footer className="text-center text-slate-500 mt-12 text-sm pb-4">
            <p>This is a visual simulation. No real cryptocurrency is being transferred.</p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Header />
          <div className="bg-slate-800 px-4 py-2 rounded-full text-sm text-cyan-400 border border-slate-700">
            Logged in as: <span className="font-bold text-white">{currentUser}</span>
          </div>
        </div>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1 space-y-8">
            <PaymentForm onSubmit={handleTransactionSubmit} isMining={isMining} />
            <StatusIndicator 
              isMining={isMining} 
              pendingCount={pendingTransactions.length}
              statusMessage={miningStatusMessage}
            />
            
            <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Admin Controls</h3>
                <button 
                    onClick={handleValidateChain}
                    disabled={isMining}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                    Verify Blockchain Integrity
                </button>
                <button 
                    onClick={clearPendingTransactions}
                    disabled={isMining || pendingTransactions.length === 0}
                    className="w-full mt-3 bg-red-600 hover:bg-red-500 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                    Clear Pending Transactions
                </button>
                {validationResult && (
                    <div className={`mt-4 p-3 rounded text-center font-bold animate-fade-in ${validationResult.message === "Verifying..." ? 'bg-slate-700 text-slate-300' : validationResult.valid ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'}`}>
                        {validationResult.message}
                    </div>
                )}
            </div>

          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Live Blockchain</h2>
            <BlockchainDisplay chain={chain} />
          </div>
        </main>
        <footer className="text-center text-slate-500 mt-12 text-sm">
          <p>This is a visual simulation. No real cryptocurrency is being transferred.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
