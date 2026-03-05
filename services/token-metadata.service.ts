// Service for retrieving rich metadata associated with a Solana token
// such as name, symbol, image, price, and social links.
// This metadata is  stored off chain and referenced by the token and no on the Solana blockchain

// DexScreener API
import axios from "axios"

interface TokenData {
    name: string,
    price: number,
    img: string

}

// Fetch Rich Meta Data from a Token
async function getTokenData(tokenAddress : String): Promise<TokenData> {
    try {
        const baseUrl = process.env.DEX_SCREENER_TOKEN_API
        const url = `${baseUrl}${tokenAddress}`

        if (!url) {
            throw new Error("Dex Screener API env variable not set")
        }

        const response = await axios.get(url)
        const token = response.data.pairs[0]


        const data: TokenData = {
            name: token.baseToken.name,
            price: Number(token.priceUsd),
            img: token.info.imageUrl
        }

        return data;

    } catch (error: any) {
        console.error("Failed to fetch Token Data:", error.message)

        throw new Error("Could not retrieve Token Data")
    }
}

export { getTokenData }