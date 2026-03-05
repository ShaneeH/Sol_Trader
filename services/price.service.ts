import axios from "axios"

// This Gets the Latest USD Price of a Solana Coin
async function getSolPriceUSD(): Promise<number> {
  try {
    const url = process.env.COIN_GECKO_API

    if (!url) {
      throw new Error("COIN_GECKO_API env variable not set")
    }

    const response = await axios.get(url)

    const price = response.data?.solana?.usd

    if (typeof price !== "number") {
      throw new Error("Invalid response from CoinGecko")
    }

    return price
  } catch (error: any) {
    console.error("Failed to fetch SOL price:", error.message)

    throw new Error("Could not retrieve SOL price")
  }
}

export { getSolPriceUSD }