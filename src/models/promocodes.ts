interface Promocodes {
    [key: string]: string[];
}

interface PromocodesData {
    promo: string[];
    discount: number;
}

type PromoDiscount = ValueOf<typeof import('../const/promocodes').PROMOCODES_NAMES>;
