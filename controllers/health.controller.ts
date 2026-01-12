import { Request, Response } from "express"

export const healthCheck = (req: Request, res: Response): void => {
  res.status(200).json({
    status: "online",
    env: process.env.NODE_ENV || "development",
    uptime_mins: process.uptime() / 60
  })
}
