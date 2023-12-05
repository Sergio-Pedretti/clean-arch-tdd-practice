import amqp from "amqplib";
import { Checkout } from "../application";
import { Input } from "../interface";

async function init() {
  const rabbitConnection = await amqp.connect("amqp://localhost");
  const channel = await rabbitConnection.createChannel();
  await channel.assertQueue("checkout", { durable: true });

  channel.consume("checkout", async function (msg: any) {
    const input = JSON.parse(msg.content.toString()) as Input;
    try {
      const checkout = new Checkout();
      const output = await checkout.execute(input);
      console.log(output);
    } catch (error: any) {
      console.log(error.message);
    }
    channel.ack(msg);
  });
}

init();
