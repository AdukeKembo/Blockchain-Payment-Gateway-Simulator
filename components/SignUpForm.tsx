import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

interface SignUpFormProps {
  onSignUp: (username: string) => void;
  onSwitchToSignIn: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onSwitchToSignIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSignUp(username);
  };

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700 max-w-md w-full mx-auto mt-12">
      <div className="flex justify-center mb-6">
        <div className="bg-cyan-500/20 p-3 rounded-full">
          <UserPlus className="w-8 h-8 text-cyan-400" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-white mb-2">Create an Account</h2>
      <p className="text-slate-400 text-center mb-6 text-sm">Join the blockchain network to start sending transactions.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-md pl-10 pr-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              placeholder="cryptouser123"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-md pl-10 pr-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              placeholder="user@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-md pl-10 pr-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 mt-6"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-400 text-sm">
          Already have an account?{' '}
          <button 
            onClick={onSwitchToSignIn}
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
