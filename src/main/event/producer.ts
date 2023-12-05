import amqp from "amqplib";

async function init() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("checkout", { durable: true });

  const input = {
    cpf: "657.491.560-01",
    products: [
      { id: 1, quantity: 5 },
      { id: 2, quantity: 10 },
      { id: 3, quantity: 2 },
    ],
  };

  channel.sendToQueue("checkout", Buffer.from(JSON.stringify(input)));
}

init();
