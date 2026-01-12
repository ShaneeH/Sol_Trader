// src/services/wallet.service.ts
import { Connection, PublicKey, Keypair } from "@solana/web3.js"

/*
Private and Public Keys

Public Key
This is how the blockchain knows who is holding what
This is essentially a wallet address
This is your public identifier
It is derived from your private key using a maths function called Ed25519
*/

// ------------------- Types -------------------
export interface WalletData {
  publicKey: string
  secretKey: number[]
}

// ------------------- Key Generation -------------------
export function generateKeys(): WalletData {
  const keypair = Keypair.generate()

  return {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: Array.from(keypair.secretKey)
  }
}

// ------------------- Connection -------------------
const connection = new Connection("https://api.mainnet-beta.solana.com")

// ------------------- Get SOL Balance -------------------
export async function getSolBalance(walletAddress: string): Promise<number> {
  try {
    const publicKey = new PublicKey(walletAddress)
    const balanceLamports = await connection.getBalance(publicKey)

    const balanceSol = balanceLamports / 1_000_000_000 // convert lamports to SOL
    console.log("SOL Balance:", balanceSol)
    return balanceSol
  } catch (error) {
    console.error("Failed to fetch SOL balance:", error)
    return 0
  }
}
