// Service for retrieving rich metadata associated with a Solana token
// such as name, symbol, image, price, and social links.
// This metadata is  stored off chain and referenced by the token and no on the Solana blockchain

// DexScreener API
import axios from "axios"
import { getSolanaConnection } from "../shared/solana.service"

interface TokenData {
    name: string,
    symbol: string,
    price: number,
    mc: number,
    img: string,
    volume: string,
    change: string
}

// Fetch Rich Meta Data from a Token via Dex API and Solana RPC
async function getTokenData(tokenAddress: String): Promise<any> {
    try {
        const DexbaseUrl = process.env.DEX_SCREENER_TOKEN_API
        const SolanaRPC = getSolanaConnection
        const url = `${DexbaseUrl}${tokenAddress}`

        if (!url) {
            throw new Error("Dex Screener API env variable not set")
        }


        const response = await axios.get(url)
        const token = response.data.pairs[0]

        const data: TokenData = {
            name: token.baseToken.name,
            symbol: token.baseToken.symbol,
            mc: token.marketCap,
            price: Number(token.priceUsd),
            img: token.info.imageUrl,
            volume : token.volume,
            change : token.priceChange       
        }

        return data;

    } catch (error: any) {
        console.error("Failed to fetch Token Data:", error.message)

        throw new Error("Could not retrieve Token Data")
    }
}

export { getTokenData }