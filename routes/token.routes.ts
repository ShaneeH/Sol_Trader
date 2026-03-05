// src/routes/wallet.routes.js
import { Router } from "express"
import { getTokenMetaData } from "../controllers/token.controller.js"
const router = Router()


router.get("/data", getTokenMetaData)


export default router