const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const monthString = ("0" + month.toString()).slice(-2);
  const day = date.getDate()
  const dayString = ("0" + day.toString()).slice(-2);
  const hours = date.getHours()
  const hoursString = ("0" + hours.toString()).slice(-2);
  const minutes = date.getMinutes()
  const minutesString= ("0" + minutes.toString()).slice(-2);

  return `${dayString}/${monthString}/${year} às ${hoursString}:${minutesString}`
}

export default formatDate