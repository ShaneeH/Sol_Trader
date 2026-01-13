import { Connection } from "@solana/web3.js"

let connectionInstance: Connection | null = null
const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com"

// This is a reusable HTTP Connection to the Solana RPC
function getSolanaConnection(): Connection {
  if (!connectionInstance) {
    connectionInstance = new Connection(RPC_ENDPOINT, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 60000,
      fetch: (url, options) => fetch(url, { ...options, keepalive: true })
    })
  }
  return connectionInstance
}

export { getSolanaConnection }