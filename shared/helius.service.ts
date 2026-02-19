// This is a reusable HTTP Connection to the Heliuis API
function getHeliusConnection(methodName : string) {

  //The JSON that we Post to the Helius API
 const json_heliuis = {
  jsonrpc: "2.0",
  id: "1",
  method: methodName,
  params: [
    "FE8X3xSTKgQ6rwe1MSds8UqrPtK4UfUGFqo2YKjzSezQ",
    { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
    { encoding: "jsonParsed" }
  ]
};
}

export {getHeliusConnection}