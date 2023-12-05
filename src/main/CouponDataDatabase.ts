import { CouponData } from "./CouponData";
import { Database } from "./Database";

export class CouponDataDatabase extends Database implements CouponData {
  async getCoupon(code: string) {
    this.openConnection();
    const [coupon] = await this.connection.query(
      "select * from branas_store.coupon where code = $1",
      [code]
    );
    await this.closeConnection();
    return coupon;
  }
}
