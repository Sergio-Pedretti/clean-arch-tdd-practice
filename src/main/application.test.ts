import { CodeGeneration, CodeGenerationSimple } from "./CodeGeneration";
import { CouponData } from "./CouponData";
import { CurrencyGateway } from "./CurrencyGateway";
import { OrderData } from "./OrderData";
import { OrderDataDatabase } from "./OrderDataDatabase";
import { ProductData } from "./ProductData";
import { Checkout } from "./application";

jest.mock("./CurrencyGateway.ts");

describe("Checkout", () => {
    let productDatabase: ProductData

    let couponDatabase: CouponData

    let orderDatabase: OrderData

    let codeGeneration: CodeGeneration
  beforeEach(() => {
    productDatabase = {
      async getProduct(id) {
        const products: { [key: number]: any } = {
          1: {
            id: 1,
            description: "Camera",
            price: 100,
            height: 20,
            width: 15,
            depth: 10,
            weight: 1,
            currency: "BRL",
          },
          2: {
            id: 2,
            description: "Gitarra",
            price: 500,
            height: 100,
            width: 30,
            depth: 10,
            weight: 3,
            currency: "BRL",
          },
          3: {
            id: 3,
            description: "Geladeira",
            price: 800,
            height: 200,
            width: 100,
            depth: 50,
            weight: 40,
            currency: "BRL",
          },
          4: {
            id: 4,
            description: "Livro Importado",
            price: 50,
            height: 20,
            width: 10,
            depth: 3,
            weight: 0.1,
            currency: "USD",
          },
          5: {
            id: 5,
            description: "Produto Frete Baixo",
            price: 100,
            height: 100,
            width: 30,
            depth: 20,
            weight: 0.5,
            currency: "BRL",
          },
        };
        return products[id];
      },
    };
    couponDatabase  = {
      async getCoupon(code) {
        const coupons: { [key: string]: any } = {
          SERGIO20: {
            code: "SERGIO20",
            percentage: 20,
            expiresIn: "2024-12-02 20:00:00",
          },
          EXPIRED15: {
            code: "EXPIRED15",
            percentage: 15,
            expiresIn: "2023-10-02 20:00:00",
          },
        };
        return coupons[code];
      },
    };
    orderDatabase = new OrderDataDatabase();
    
    codeGeneration = new CodeGenerationSimple()
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should create a order with 3 products and correct currency", async () => {
    const input = {
      cpf: "657.491.560-01",
      products: [
        { id: 1, quantity: 5 },
        { id: 2, quantity: 10 },
        { id: 3, quantity: 2 },
        { id: 4, quantity: 1 },
      ],
    };

    const currencyGatewayStub = CurrencyGateway as jest.MockedClass<
      typeof CurrencyGateway
    >;
    currencyGatewayStub.prototype.getCurrency.mockResolvedValue({
      BRL: 1,
      USD: 3,
    });

    const checkout = new Checkout(productDatabase, couponDatabase, orderDatabase, codeGeneration);
    const output = await checkout.execute(input);

    expect(output.cartValue).toBe(7250);
    currencyGatewayStub.prototype.getCurrency.mockRestore();
  });

  it("should create a order with 3 products", async () => {
    const input = {
      cpf: "657.491.560-01",
      products: [
        { id: 1, quantity: 5 },
        { id: 2, quantity: 10 },
        { id: 3, quantity: 2 },
      ],
    };

    const currencyGatewayStub = CurrencyGateway as jest.MockedClass<
      typeof CurrencyGateway
    >;
    currencyGatewayStub.prototype.getCurrency.mockResolvedValue({
      BRL: 1,
      USD: 3,
    });

    const checkout = new Checkout(productDatabase, couponDatabase, orderDatabase, codeGeneration);
    const output = await checkout.execute(input);

    expect(output.cartValue).toBe(7100);
  });
});
