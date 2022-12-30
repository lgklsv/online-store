export const getCartPage = (cartItems: CartData[], page: number, limit: number) => {
    const start = (page - 1) * limit;
    const end = page * limit;
    return cartItems.slice(start, end);
};
