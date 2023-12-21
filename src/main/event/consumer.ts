import amqp from "amqplib";
import { Checkout } from "../application";
import { Input } from "../interface";
import { ProductDataDatabase } from "../ProductDataDatabase";
import { CouponDataDatabase } from "../CouponDataDatabase";
import { OrderDataDatabase } from "../OrderDataDatabase";
import { CodeGenerationSimple } from "../CodeGeneration";

async function init() {
  const rabbitConnection = await amqp.connect("amqp://localhost");
  const channel = await rabbitConnection.createChannel();
  await channel.assertQueue("checkout", { durable: true });

  channel.consume("checkout", async function (msg: any) {
    const input = JSON.parse(msg.content.toString()) as Input;
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
    channel.ack(msg);
  });
}

init();
