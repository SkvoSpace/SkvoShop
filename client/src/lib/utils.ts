export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(price)
}

export const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + '...' : text
}
