import { CouponDataDatabase } from "./CouponDataDatabase"
import { GetOrderByCpf } from "./GetOrderByCpf"
import { OrderDataDatabase } from "./OrderDataDatabase"
import { ProductDataDatabase } from "./ProductDataDatabase"
import { Checkout } from "./application"

describe('GetOrderByCPF', () => {
  it('should consult a order', async () => {
    const productData = new ProductDataDatabase()
    const couponData = new CouponDataDatabase()
    const orderData = new OrderDataDatabase()
    const checkout = new Checkout(productData, couponData, orderData)
    const input = {
      cpf: "657.491.560-01",
      products: [
        { id: 1, quantity: 5 },
        { id: 2, quantity: 10 },
        { id: 3, quantity: 2 },
      ],
    };
    await checkout.execute(input)
    const getOrderByCpf = new GetOrderByCpf(orderData)
    const output = await getOrderByCpf.execute("657.491.560-01")
    expect(output.total).toBe("5680")
  })
})
