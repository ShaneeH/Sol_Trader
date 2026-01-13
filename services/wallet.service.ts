// src/services/wallet.service.ts
import { PublicKey, Keypair } from "@solana/web3.js"
import { getSolanaConnection } from "../shared/solana.service.js"

// ------------------- Types -------------------
export interface WalletData {
  publicKey: string
  secretKey: number[]
}

export interface BalanceResult {
  sol: number
  usd: number
  error?: string
}

// ------------------- Constants -------------------
const LAMPORTS_PER_SOL = 1_000_000_000

// ------------------- Key Generation -------------------
export function generateKeys(): WalletData {
  const keypair = Keypair.generate()

  return {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: Array.from(keypair.secretKey)
  }
}

// ------------------- Get SOL Balance -------------------
export async function getSolBalance(walletAddress: string): Promise<BalanceResult> {
  try {
    // Validate address format early to avoid unnecessary network calls
    let publicKey: PublicKey
    try {
      publicKey = new PublicKey(walletAddress)
    } catch {
      return { sol: -1, usd: -1, error: "Invalid wallet address format" }
    }

    const connection = getSolanaConnection()
    const balanceLamports = await connection.getBalance(publicKey)

    const balanceSol = balanceLamports / LAMPORTS_PER_SOL

    const solPriceUsd = 139.14 // TODO: Fetch from price API
    const usdBalance = balanceSol * solPriceUsd

    return { sol: balanceSol, usd: usdBalance }
  } catch (error: any) {
    console.error("Failed to fetch SOL balance:", error)
    return {
      sol: -1,
      usd: -1,
      error: error.message || "Unknown error"
    }
  }
}