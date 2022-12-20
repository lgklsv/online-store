type SortTypes = ValueOf<typeof import('../const/select-sort').SORT_TYPE>;

type SortFn = (products: ExtendedProduct[]) => ExtendedProduct[];
