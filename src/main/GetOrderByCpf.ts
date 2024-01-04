import { OrderData } from "./OrderData";

export class GetOrderByCpf {
    constructor(readonly orderData: OrderData) { }

    async execute(cpf:string): Promise<Output> {
        const order = await this.orderData.getByCpf(cpf);
        return {
            total: order.totalValue
        }
    }
}

type Output = {
    total: number
}