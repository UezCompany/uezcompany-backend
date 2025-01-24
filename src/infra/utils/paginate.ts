export function paginate(page: number = 1, pageSize: number = 10) {
  const validPage = Math.max(1, page)
  const validPageSize = Math.max(1, pageSize)
  const skip = (validPage - 1) * validPageSize
  const take = validPageSize
  return { skip, take }
}
