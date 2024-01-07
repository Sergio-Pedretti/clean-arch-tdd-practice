import { CouponDataDatabase } from "./CouponDataDatabase";
import { ValidateCoupon } from "./ValidateCoupon";

describe('ValidateCoupon', () => {
  it('should validate a coupon', async () => {
    const couponData = new CouponDataDatabase()
    const validateCoupon = new ValidateCoupon(couponData)
    const output = await validateCoupon.validate('SERGIO20', 1000);
    expect(output.isExpired).toBeFalsy();
    expect(output.discount).toBe(200);
  })
})
