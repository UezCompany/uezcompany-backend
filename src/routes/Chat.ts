import express from "express"
const router = express.Router()
import ChatController from "@/controllers/Chat"
import validateJWT from "@/middlewares/authMiddleware"
import userMiddleware from "@/middlewares/userMiddleware"

router.get(
  "/chats",
  validateJWT,
  userMiddleware.getUserDataByDbMiddleware,
  ChatController.getChats,
)

router.post(
  "/chat/create/:requestedContactId",
  validateJWT,
  ChatController.createChat,
)

router.post("/chat/message", validateJWT, ChatController.sendMessage)
router.post(
  "/chat/message/budget",
  validateJWT,
  ChatController.sendBudgetMessage,
)

router.post("/chat/message/image", validateJWT, ChatController.sendMessage)
router.delete("/chat/delete/:chatId", validateJWT, ChatController.deleteChat)

export default router
