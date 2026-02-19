
// This File Contains all Helius API Endpoints

// Get all The Tokens inside a Wallet 

export function getWalletTokens(wallet: string, methodName: string) {
    const json = {
        jsonrpc: "2.0",
        id: "1",
        method: methodName,
        params: [
            wallet,
            { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
            { encoding: "jsonParsed" }
        ]
    };

    return json

}