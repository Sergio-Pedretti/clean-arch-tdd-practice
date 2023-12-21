import { CodeGenerationSimple } from "../CodeGeneration";
import { CouponDataDatabase } from "../CouponDataDatabase";
import { OrderDataDatabase } from "../OrderDataDatabase";
import { ProductDataDatabase } from "../ProductDataDatabase";
import { Checkout } from "../application";
import { Input } from "../interface";

const input: Input = {
  cpf: "",
  products: [],
};

process.stdin.on("data", async function (chunk) {
  const command = chunk.toString().replace(/\n/g, "");

  if (command.startsWith("set-cpf")) {
    const params = command.replace("set-cpf ", "");
    input.cpf = params;
  }

  if (command.startsWith("add-item")) {
    const params = command.replace("add-item ", "");
    const [idProduct, quantity] = params.split(" ");
    input.products.push({
      id: Number(idProduct),
      quantity: Number(quantity),
    });
  }

  if (command.startsWith("checkout")) {
    try {
    const checkout = new Checkout(
      new ProductDataDatabase(),
      new CouponDataDatabase(),
      new OrderDataDatabase(),
      new CodeGenerationSimple()
    );
      const output = await checkout.execute(input);
      console.log(output);
    } catch (error: any) {
      console.log(error.message);
    }
  }
});
