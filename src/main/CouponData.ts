export interface CouponData {
  getCoupon: (code: string) => Promise<any>;
}
