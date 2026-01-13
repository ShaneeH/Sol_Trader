// src/routes/wallet.routes.js
import { Router } from "express"
import { generateWallet , fetchSolBalance} from "../controllers/wallet.controller.js"
const router = Router()

router.get("/generate", generateWallet)
router.get("/balance", fetchSolBalance)

export default router
