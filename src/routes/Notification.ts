import express from "express"
const router = express.Router()
import authMiddleware from "../middlewares/authMiddleware"
import NotificationController from "../controllers/Notification"
const { getAllNotifications, sendNotification, markAsRead } =
  NotificationController

router.get("/notifications", authMiddleware, getAllNotifications)
router.post("/notification/send/:id", authMiddleware, sendNotification)
router.put("/notification/read/:id", authMiddleware, markAsRead)

export default router
