// server.js
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config()

const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || "development"

/* ---------------- SERVER ---------------- */

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`)
})

/* ---------------- GRACEFUL SHUTDOWN ---------------- */

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)

function shutdown() {
  console.log("Shutting down server...")
  server.close(() => {
    console.log("Server closed")
    process.exit(0)
  })
}
