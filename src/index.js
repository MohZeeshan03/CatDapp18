import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WagmiConfig } from "wagmi";
import { wagmiClient ,projectId, ethereumClient } from "./hooks/wagmi";
import { Web3Modal } from "@web3modal/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <App />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </React.StrictMode>
);