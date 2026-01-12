// src/routes/wallet.routes.js
import { Router } from "express"
import { generateWallet , fetchSolBalance} from "../controllers/wallet.controller.js"
const router = Router()

router.get("/generate", generateWallet) // -> localhost:3000/wallet/generate
router.get("/balance", fetchSolBalance)

export default router
