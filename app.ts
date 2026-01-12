// src/app.ts
import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import walletRoutes from "./routes/wallet.routes.js"
import healthRoutes from "./routes/health.routes.js"

const app = express()
const NODE_ENV: string = process.env.NODE_ENV || "development"

/* ---------------- MIDDLEWARE ---------------- */
app.use(helmet())
app.use(cors())
app.use(express.json())

if (NODE_ENV === "development") {
  app.use(morgan("dev"))
} else {
  app.use(morgan("combined"))
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
})

app.use(limiter)

/* ---------------- ROUTES ---------------- */
app.use("/wallet", walletRoutes)
app.use("/health", healthRoutes)

/* ---------------- 404 HANDLER ---------------- */
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" })
})

/* ---------------- ERROR HANDLER ---------------- */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).json({ error: "Internal server error" })
})

export default app
