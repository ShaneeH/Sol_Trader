// server.ts
import dotenv from "dotenv"
import app from "./app.js" 

dotenv.config()

console.log("\nSERVER RESTARTED", new Date().toISOString())

const PORT: number = Number(process.env.PORT) || 3000
const NODE_ENV: string = process.env.NODE_ENV || "development"

// ---------------- SERVER ----------------
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode \n`)
})

// ---------------- GRACEFUL SHUTDOWN ----------------
process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)

function shutdown(): void {
  console.log("Shutting down server...")
  server.close(() => {
    console.log("Server closed")
    process.exit(0)
  })
}
