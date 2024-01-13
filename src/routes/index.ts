import { Router } from "express"

import clientesRoutes from "./Clientes"
import uzersRoutes from "./Uzers"
import servicosRoutes from "./Servicos"
// import funcionariosRoutes from "./funcionariosRoutes"
// import authRoutes from "./authRoutes"
// import userRoutes from "./userRoutes"
// import pedidosRoutes from "./pedidosRoutes"
// import chatRoutes from "./chatRoutes"
// import notificationsRoutes from "./notificationsRoutes"

const router = Router()

router.use(clientesRoutes)
router.use(uzersRoutes)
router.use(servicosRoutes)
// router.use(funcionariosRoutes)
// router.use(authRoutes)
// router.use(userRoutes)
// router.use(pedidosRoutes)
// router.use(chatRoutes)
// router.use(notificationsRoutes)

export default router
