export interface ProductData {
  getProduct: (id: number) => Promise<any>;
}
