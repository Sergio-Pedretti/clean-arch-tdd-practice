
export class Coupon {
  constructor(readonly coupon:string, readonly percentage:number, readonly expireDate: Date){}

  isExpired():boolean {
    const now = new Date().getTime();
    return new Date(this.expireDate).getTime() < now;
  }

  getDiscount(total:number): number {
    return total * (this.percentage / 100);
  }
}