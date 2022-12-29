interface Promocodes {
    [key: string]: string[];
}

// interface PromocodesData {
//     discount: number;
//     fullmane: string;
//     applied: boolean;
// }

type PromoDiscount = ValueOf<typeof import('../const/promocodes').PROMOCODES_NAMES>;
