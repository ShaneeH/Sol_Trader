// src/controllers/wallet.controller.ts
import { Request, Response, NextFunction } from "express"
import { generateKeys, getSolBalance, WalletData } from "../services/wallet.service.js"

/**
 * Controller for generating a new Solana wallet
 */
export const generateWallet = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const wallet: WalletData = generateKeys()
    res.status(200).json(wallet)
  } catch (error) {
    next(error) // passes the error to your app.ts error middleware
  }
}

/**
 * Get the SOL balance of a wallet
 * Expects query parameter: ?publicKey=<wallet_public_key>
 */
export const fetchSolBalance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { publicKey } = req.query

    if (!publicKey || typeof publicKey !== "string") {
      res.status(400).json({ error: "publicKey query parameter is required" })
      return
    }

    const balance: number = await getSolBalance(publicKey)
    res.status(200).json({ publicKey, balance })
  } catch (error) {
    next(error)
  }
}
