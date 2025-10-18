import express from "express"
import { protect } from "../middleware/authentication.js"
import { getChatMessages, getUserRecentMessages, sendMessage, sseController } from "../controller/messageController.js"
import { upload } from "../configs/multer.js"

const messageRouter=express.Router()
messageRouter.post("/send",upload.single("image"),protect,sendMessage)
messageRouter.get("/:userId",sseController)
messageRouter.post("/chat",protect,getChatMessages)

export default messageRouter