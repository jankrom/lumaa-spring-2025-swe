import { Router, Request, Response, RequestHandler } from "express"
import { register, login } from "../controllers/auth"

const router = Router()

// Type assertion to fix the overload error
router.post("/register", register as RequestHandler)
router.post("/login", login as RequestHandler)

export default router
