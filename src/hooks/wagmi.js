import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
  } from "@web3modal/ethereum";
  
  import { configureChains, createClient } from "wagmi";
  import { goerli } from "wagmi/chains";
  
  export const projectId = '6eb6d0efc3b68bce167c53087ba69e72';
  // Wagmi client
  const { provider } = configureChains([goerli], [
    w3mProvider({ projectId }),
  ]);
  
  export const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains: [goerli] }),
    provider,
  });
  
  // Web3Modal Ethereum Client
  export const ethereumClient = new EthereumClient(wagmiClient, [goerli]);