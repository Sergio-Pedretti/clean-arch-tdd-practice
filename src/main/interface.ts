export type Product = {
  id: number;
  quantity: number;
};

export type Input = {
  cpf: string;
  products: Product[];
  coupon?: string;
};

export type Output = {
  cartValue: number;
  transportFee: number;
  orderCode: string
};
