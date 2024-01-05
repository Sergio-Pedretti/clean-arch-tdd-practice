import express from "express";
import { Checkout } from "../application";
import { Input } from "../interface";
import { ProductDataDatabase } from "../ProductDataDatabase";
import { CouponDataDatabase } from "../CouponDataDatabase";
import { OrderDataDatabase } from "../OrderDataDatabase";

const app = express();
app.use(express.json());
const PORT = 3001;

app.post("/checkout", async (req, res) => {
  const input = req.body as Input;
  try {
    const checkout = new Checkout(
      new ProductDataDatabase(),
      new CouponDataDatabase(),
      new OrderDataDatabase(),
    );
    const output = await checkout.execute(input);
    res.json(output);
  } catch (error: any) {
    res.status(422).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
