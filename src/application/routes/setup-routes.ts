import { FastifyInstance } from "fastify"
import GetClients from "./Client/get-clients"
import GetUezers from "./Uezer/get-uezers"
import GetSpecialities from "./Speciality/get-specialities"
import GetSpeciality from "./Speciality/get-speciality"
import GetSpecialitiesByProfessionName from "./Speciality/get-specialities-by-profession"
import GetProfessions from "./Speciality/get-professions"
import Register from "./Auth/register"
import GetOrders from "./Order/get-orders"
import GetOrdersCreatedByUser from "./Order/get-orders-created-by-user"
import GetOrdersAssignedsToUser from "./Order/get-orders-assigneds-to-user"
import GetActiveOrders from "./Order/get-active-orders"
import AssignOrderToUezer from "./Order/assign-order-to-uezer"
import CreateOrder from "./Order/create-order"
import FinishOrder from "./Order/finish-order"
import RateOrder from "./Order/rate-order"
import GetUserNotifications from "./Notification/get-notifications"
import ReadNotification from "./Notification/read-notification"
import ReadAllNotificacions from "./Notification/read-all-notifications"
import Auth from "./Auth/auth"
import Logout from "./Auth/logout"
import CreateChat from "./Chat/create-chat"
import GetChats from "./Chat/get-chats"
import GetUezerBySlug from "./Uezer/get-uezer-by-slug"
import GetClient from "./Client/get-client"
import GetPortfolios from "./Uezer/Portfolio/get-portfolios"
import GetOrdersById from "./Order/get-order-by-id"
import AuthWithGoogle from "./Auth/google-auth"
import GetUserBySlug from "./User/get-user-by-slug"
import GetUsers from "./User/get-users"
import CreatePortfolio from "./Uezer/Portfolio/create-portfolio"
import DeletePortfolio from "./Uezer/Portfolio/delete-portfolio"
import ForgotPassword from "./Auth/forgot-password"
import UpdateClientBySlug from "./Client/update-client"
import UpdateUezertBySlug from "./Uezer/update-uezer"
import UpdateUserProfileImage from "./User/update-user-profile-image"
import CompleteRegister from "./Auth/complete-register"

export async function SetupRoutes(app: FastifyInstance) {
  app.get("/", (req, reply) => {
    reply.status(200).send({ message: "Server is running" })
  })

  // Auth
  app.register(Register)
  app.register(Auth)
  app.register(Logout)
  app.register(AuthWithGoogle)
  app.register(ForgotPassword)
  app.register(CompleteRegister)
  // // User
  app.register(GetUserBySlug)
  app.register(GetUsers)
  app.register(UpdateUserProfileImage)
  // // Client
  app.register(GetClient)
  app.register(GetClients)
  app.register(UpdateClientBySlug)
  // // Uezer
  app.register(GetUezers)
  app.register(GetUezerBySlug)
  app.register(UpdateUezertBySlug)
  // // Portfolio
  app.register(GetPortfolios)
  app.register(CreatePortfolio)
  app.register(DeletePortfolio)
  // // Speciality
  app.register(GetSpecialities)
  app.register(GetSpeciality)
  app.register(GetSpecialitiesByProfessionName)
  app.register(GetProfessions)
  // // Order
  app.register(GetOrders)
  app.register(GetOrdersById)
  app.register(GetOrdersCreatedByUser)
  app.register(GetOrdersAssignedsToUser)
  app.register(GetActiveOrders)
  app.register(AssignOrderToUezer)
  app.register(CreateOrder)
  app.register(FinishOrder)
  app.register(RateOrder)
  // // Notification
  app.register(GetUserNotifications)
  app.register(ReadNotification)
  app.register(ReadAllNotificacions)
  // // Chat
  app.register(CreateChat)
  app.register(GetChats)
}
