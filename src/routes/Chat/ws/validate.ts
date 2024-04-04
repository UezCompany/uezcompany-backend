import { Socket } from "socket.io"

export default function validateNewSocketUser(socket: Socket) {
  socket.on("validate", (token: any) => {
    // if (token) {
    //   //logica para obter o usuario no banco de dados a partir do token
    //   users.push({
    //     socketId: socket.id,
    //     authorizated: true,
    //     userId: "eiufhreuirhhuighuhfdh",
    //   })
    //   socket.send("Autorizado com sucesso!")
    // }
    console.log("token", token)
    socket.send("hihihiha")
  })
}
