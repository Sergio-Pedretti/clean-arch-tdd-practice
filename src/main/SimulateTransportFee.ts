import { ProductDataDatabase } from "./ProductDataDatabase"
import { TransportFeeCalculator } from "./TransportFeeCalculator";

type Input = {
    items: {id: number, quantity: number}[]
}
type Output = {transportFee: number}

export class SimulateTransportFee {
    constructor (private productData: ProductDataDatabase) {
    }

    async execute (input: Input): Promise<Output> {
    let transportFee = 0;
    for (const product of input.items) {
      const myProduct = await this.productData.getProduct(product.id);
      if (myProduct) {
        transportFee += TransportFeeCalculator.calculate(myProduct)
      }
    }
    return { transportFee }
    }
}