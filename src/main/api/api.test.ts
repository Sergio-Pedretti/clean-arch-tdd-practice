import axios from "axios";

axios.defaults.validateStatus = () => {
  return true;
};

describe("Order", () => {
  const url = "http://localhost:3001/checkout";

  it("should create a order with 3 products", async () => {
    const products = [
      { id: 1, quantity: 5 },
      { id: 2, quantity: 10 },
      { id: 3, quantity: 2 },
    ];

    const response = await axios.post(url, {
      cpf: "657.491.560-01",
      products,
    });
    const output = response.data;

    expect(response.status).toBe(200);
    expect(output.cartValue).toBe(7100);
  });
  it("should create a order with 3 products and apply discount", async () => {
    const products = [
      { id: 1, quantity: 5 },
      { id: 2, quantity: 10 },
      { id: 3, quantity: 2 },
    ];
    const coupon = "SERGIO20";

    const response = await axios.post(url, {
      cpf: "657.491.560-01",
      products,
      coupon,
    });
    const output = response.data;

    expect(response.status).toBe(200);
    expect(output.cartValue).toBe(5680);
  });
  it("should throw error case order has invalid CPF", async () => {
    const products = [
      { id: 1, quantity: 5 },
      { id: 2, quantity: 10 },
      { id: 3, quantity: 2 },
    ];

    const invalidCPF = {
      cpf: "111.111.111-11",
      products,
    };

    const response = await axios.post(url, invalidCPF);
    const output = response.data;

    expect(response.status).toBe(422);
    expect(output.message).toBe("Invalid CPF");
  });

  it("should not apply discount for expired coupon", async () => {
    const products = [
      { id: 1, quantity: 5 },
      { id: 2, quantity: 10 },
      { id: 3, quantity: 2 },
    ];
    const coupon = "EXPIRED15";

    const response = await axios.post(url, {
      cpf: "657.491.560-01",
      products,
      coupon,
    });
    const output = response.data;

    expect(response.status).toBe(422);
    expect(response.data.message).toBe("Coupon Expired");
  });

  it("should not have zero os negative items", async () => {
    const products = [
      { id: 1, quantity: 5 },
      { id: 2, quantity: -10 },
      { id: 3, quantity: 2 },
    ];
    const response = await axios.post(url, {
      cpf: "657.491.560-01",
      products,
    });
    const output = response.data;

    expect(response.status).toBe(422);
    expect(output.message).toBe("Invalid Quantity items");
  });

  it("should not have repeated items", async () => {
    const products = [
      { id: 1, quantity: 5 },
      { id: 1, quantity: 1 },
      { id: 3, quantity: 2 },
    ];
    const response = await axios.post(url, {
      cpf: "657.491.560-01",
      products,
    });
    const output = response.data;

    expect(response.status).toBe(422);
    expect(output.message).toBe("Reapeted Items");
  });

  it("should not send empty cart", async () => {
    const response = await axios.post(url, {
      cpf: "657.491.560-01",
      products: [],
    });
    const output = response.data;

    expect(response.status).toBe(422);
    expect(output.message).toBe("Empty Cart");
  });

  it("should not exist products with negative or zero dimentions", async () => {
    const products = [{ id: 4, quantity: 5 }];

    const response = await axios.post(url, {
      cpf: "657.491.560-01",
      products,
    });
    const output = response.data;

    expect(response.status).toBe(422);
    expect(output.message).toBe("Some Item has wrong dimensions");
  });

  it("should correctly set transport fee", async () => {
    const products = [
      {
        id: 1,
        quantity: 4,
      },
      {
        id: 2,
        quantity: 8,
      },
    ];

    const response = await axios.post(url, {
      cpf: "657.491.560-01",
      products,
    });
    const output = response.data;

    expect(response.status).toBe(200);
    expect(output.transportFee).toBe(40);
  });

  it("should set min transport fee", async () => {
    const products = [
      {
        id: 5,
        quantity: 1,
      },
    ];

    const response = await axios.post(url, {
      cpf: "657.491.560-01",
      products,
    });
    const output = response.data;

    expect(response.status).toBe(200);
    expect(output.transportFee).toBe(10);
  });
});
