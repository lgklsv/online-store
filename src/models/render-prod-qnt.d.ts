interface RenderProductQuantity {
  countProduct: number;
  activeSize?: string;
  product: ExtendedProduct;
  onEmptyCount: () => void;
  page: string;
}
