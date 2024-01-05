export class TransportFeeCalculator {
    static MIN_FEE = 10;
    static DISTANCE = 1000;
    static calculate (product: any): number {
        const transportFee = this.DISTANCE * (product.weight / 100);
        return transportFee < this.MIN_FEE ? this.MIN_FEE : transportFee; 
    }
}