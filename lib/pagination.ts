export const paginate = <T>(
  data: T[],
  currentPage: number,
  perPage: number
) => {
  const totalPages = Math.ceil(data.length / perPage)

  const paginatedData = data.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  return {
    totalPages,
    paginatedData,
  }
}