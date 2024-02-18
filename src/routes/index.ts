import { Router } from "express"

import clientesRoutes from "./Cliente"
import uzersRoutes from "./Uzer"
import servicosRoutes from "./Servico"
import pedidosRoutes from "./Pedido"
import userRoutes from "./User"
import chatRoutes from "./Chat"
import notificationsRoutes from "./Notification"
import authRoutes from "./Auth"

const router = Router()

router.use(authRoutes)
router.use(clientesRoutes)
router.use(uzersRoutes)
router.use(servicosRoutes)
router.use(pedidosRoutes)
router.use(notificationsRoutes)
router.use(chatRoutes)
router.use(userRoutes)

export default router
