import { Product } from "./interface"

export namespace OrderData {
    export interface Input {
        code: string,
        cpf: string,
        totalValue: number,
        transportFee: number,
        products: Product[]
    }

    export interface Output {
        totalValue: number,
    }
}

export interface OrderData {
    save: (input: OrderData.Input) => Promise<void>
    getByCpf: (input: string) => Promise<OrderData.Output>
    getSequence: () => Promise<number>
}