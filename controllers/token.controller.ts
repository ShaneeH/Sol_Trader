import { Request, Response, NextFunction } from "express"
import { getTokenData } from "../services/token-metadata.service.js"

export const getTokenMetaData = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const { tokenAddress } = req.query

    if (!tokenAddress) {
      res.status(400).json({ error: "tokenAddress is required" })
      return
    }

    // const tokenData = await getTokenData(tokenAddress)
    const token  = String(tokenAddress);
    const data = await getTokenData(token);

    res.status(200).json(data)

  } catch (error) {
    next(error)
  }
}