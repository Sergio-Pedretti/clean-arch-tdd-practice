import { Database } from "./Database";
import { OrderData } from "./OrderData";

export class OrderDataDatabase extends Database implements OrderData {
    order: OrderData.Input[] = []

    async save(input: OrderData.Input) {
        const {code, totalValue, transportFee, products, cpf} = input;
        const quantities = products.map((product) => product.quantity)
        const ids = products.map((product) => product.id)
        this.openConnection();
        try {
            await this.connection.none(
          "INSERT INTO branas_store.orders(code, totalValue, cpf) VALUES ($1, $2, $3)",
          [code, totalValue, cpf])
            
        } catch (error) {
            console.log(error)
        }
        await this.closeConnection();
    }

    async getByCpf(input: string): Promise<OrderData.Output> {
        this.openConnection();
        const [total] = await this.connection.query(
          "SELECT * FROM branas_store.orders WHERE cpf = $1", [input])
        await this.closeConnection();
        return {
            totalValue: total.totalvalue
        }
    }

    async getSequence(): Promise<number> {
         this.openConnection();
        const [options] = await this.connection.query(
          "SELECT COUNT(*)::integer as count FROM branas_store.orders")
        await this.closeConnection();
        return options.count;
    }
}