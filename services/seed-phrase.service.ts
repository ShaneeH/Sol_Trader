import * as bip39 from "bip39"
import { derivePath } from "ed25519-hd-key"
import { Keypair } from "@solana/web3.js"
import bs58 from "bs58"

export async function getKeys(phrase: string) {
  const seed = await bip39.mnemonicToSeed(phrase)

  const derived = derivePath("m/44'/501'/0'/0'", seed.toString("hex"))

  const keypair = Keypair.fromSeed(derived.key)

  return {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: bs58.encode(keypair.secretKey)
  }
}


