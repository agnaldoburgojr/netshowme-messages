const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${day}/${month + 1}/${year} às ${hours}:${minutes}`
}

export default formatDate