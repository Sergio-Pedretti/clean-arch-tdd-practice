import { validate } from "../utils/validateCPF";
import { CouponData } from "./CouponData";
import { CurrencyGateway } from "./CurrencyGateway";
import { ProductData } from "./ProductData";
import { Input, Output } from "./interface";

const MIN_FEE = 10;
const DISTANCE = 1000;

export class Checkout {
  constructor(
    readonly productData: ProductData,
    readonly couponData: CouponData
  ) {}

  async execute(input: Input): Promise<Output> {
    const { cpf, products, coupon } = input;
    const isValid = validate(cpf);
    if (!isValid) {
      throw new Error("Invalid CPF");
    }

    if (!products) {
      throw new Error("Empty Cart");
    }

    if (products && products.length === 0) {
      throw new Error("Empty Cart");
    }

    const uniqueProducts = new Set(products.map((product) => product.id));
    if (uniqueProducts.size < products.length) {
      throw new Error("Reapeted Items");
    }

    let totalValue = 0;
    let transportFee = 0;
    const currencyGateway = new CurrencyGateway();
    const currencies: any = await currencyGateway.getCurrency();
    for (const product of products) {
      if (product.quantity <= 0) {
        throw new Error("Invalid Quantity items");
      }
      const myProduct = await this.productData.getProduct(product.id);
      if (
        myProduct.height <= 0 ||
        myProduct.width <= 0 ||
        myProduct.depth <= 0 ||
        myProduct.weight <= 0
      ) {
        throw new Error("Some Item has wrong dimensions");
      }
      if (myProduct) {
        totalValue +=
          parseInt(myProduct.price) *
          currencies[myProduct.currency] *
          product.quantity;
        transportFee += DISTANCE * (myProduct.weight / 100);
      }
    }
    if (coupon) {
      const myCoupon = await this.couponData.getCoupon(coupon);

      const now = new Date();
      const expiredDate = new Date(myCoupon.expiresin);

      if (expiredDate > now) {
        totalValue -= totalValue * (myCoupon.percentage / 100);
      } else {
        console.log("COUPOM EXPIRED ALREADY");
      }
    }
    if (transportFee < MIN_FEE) {
      transportFee = MIN_FEE;
    }
    return {
      cartValue: totalValue,
      transportFee,
    };
  }
}
