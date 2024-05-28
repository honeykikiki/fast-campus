function addDelimiter(value: string | number, delimiter = ',') {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}

export default addDelimiter
