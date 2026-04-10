export const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    }).format(price);
};
export const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
};
//# sourceMappingURL=utils.js.map