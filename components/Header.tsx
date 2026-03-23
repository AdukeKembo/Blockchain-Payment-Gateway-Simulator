
import React from 'react';

const CubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.25a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM12 15.75a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM7.057 4.243a.75.75 0 0 1 .53 1.299l-2.25 3.75a.75.75 0 0 1-1.299-.53l2.25-3.75a.75.75 0 0 1 .769-.519ZM17.47 9.273a.75.75 0 1 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 1.06l-2.25 2.25ZM3.75 12a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75ZM16.5 12a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75ZM7.057 19.757a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0ZM15.182 16.943a.75.75 0 0 1 1.299-.53l2.25 3.75a.75.75 0 1 1-1.299.53l-2.25-3.75ZM2.25 12c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12Z" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-slate-700 pb-6">
      <div className="flex items-center justify-center gap-4">
        <CubeIcon className="w-12 h-12 text-cyan-400"/>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Blockchain Payment Simulator
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Visualize how cryptocurrency transactions are processed, mined, and added to an immutable chain.
      </p>
    </header>
  );
};
