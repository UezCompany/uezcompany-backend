interface INotification {
  type: string | null
  content: string
  meta: Date | string
  _idUser: string
  readed: boolean
}

export default INotification
