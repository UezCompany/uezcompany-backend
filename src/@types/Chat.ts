interface IChat {
  uzerId: string
  uzerService: string
  clienteId: string
  createdAt: Date
  messages: {
    _id: string
    sendDate: string
    sendHour: string
    senderId: string
    content: string
    type: string
    _idPedido: string
  }
  photo: string
  clienteName: string
  uzerName: string
}

export default IChat
