// src/controllers/wallet.controller.js
import { generateKeys } from "../services/wallet.service.js"
import { getSolBalance } from "../services/wallet.service.js"

/**
 * Controller for generating a new Solana wallet
 */

export const generateWallet = (req, res, next) => {
  try {
    const wallet = generateKeys()
    res.status(200).json(wallet)
  } catch (error) {
    next(error) // passes the error to your app.js error middleware
  }
} 

/**
 * Get the SOL balance of a wallet
 * Expects query parameter: ?publicKey=<wallet_public_key>
 */
export const fetchSolBalance = async (req, res, next) => {
  try {
    const { publicKey } = req.query

    if (!publicKey || typeof publicKey !== "string") {
      return res.status(400).json({ error: "publicKey query parameter is required" })
    }

    const balance = await getSolBalance(publicKey)
    res.status(200).json({ publicKey, balance })
  } catch (error) {
    next(error)
  }
}