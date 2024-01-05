
import { ProductDataDatabase } from "./ProductDataDatabase"
import { SimulateTransportFee } from "./SimulateTransportFee"


describe('SimulateTransportFee', () => {
  it('should simulate transport fee for a given order', async () => {
    const productData = new ProductDataDatabase()
    const simulateTransportFee = new SimulateTransportFee(productData)
    const input = {
        items: [{id: 5, quantity: 1}],
    }
    const output = await simulateTransportFee.execute(input)
    expect(output.transportFee).toBe(10)
  })
})
