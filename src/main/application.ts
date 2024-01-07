import { validate } from "../utils/validateCPF";
import { CouponData } from "./CouponData";
import { CurrencyGateway } from "./CurrencyGateway";
import { OrderData } from "./OrderData";
import { ProductData } from "./ProductData";
import { TransportFeeCalculator } from "./TransportFeeCalculator";
import { ValidateCoupon } from "./ValidateCoupon";
import { Input, Output } from "./interface";

export class Checkout {
  constructor(
    readonly productData: ProductData,
    readonly couponData: CouponData,
    readonly orderData: OrderData,
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
        transportFee += TransportFeeCalculator.calculate(myProduct)
      }
    }
    let discount = 0;
     if (coupon) {
      const validateCoupon = new ValidateCoupon(this.couponData);
      const {isExpired, discount: validateDiscount} = await validateCoupon.validate(coupon, totalValue);

      if (isExpired) 
      throw new Error("Coupon Expired");

      discount = validateDiscount;
    }
    totalValue -= discount;

    const year = new Date().getFullYear()
    const sequence = await this.orderData.getSequence();
    const code = `${year}${String(sequence+1).padStart(8,'0')}`;


    await this.orderData.save({
      code,
      cpf,
      totalValue,
      transportFee,
      products
    });

    return {
      cartValue: totalValue,
      transportFee,
      code,
    };
  }
}
