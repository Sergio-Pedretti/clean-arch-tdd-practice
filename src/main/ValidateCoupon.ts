import { Coupon } from "./Coupon";
import { CouponData } from "./CouponData";

type Output = {
    isExpired: boolean;
    discount: number;
}

export class ValidateCoupon {
    constructor (readonly couponData: CouponData) {}

    async validate(code: string, total:number): Promise<Output> {
      const couponData = await this.couponData.getCoupon(code);
      const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expiresin);
      return {
        discount: coupon.getDiscount(total),
        isExpired: coupon.isExpired(),
      }
    }
}