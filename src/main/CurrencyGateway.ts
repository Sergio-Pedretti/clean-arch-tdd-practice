export class CurrencyGateway {
  async getCurrency() {
    return {
      BRL: 1,
      USD: 3 + Math.random(),
    };
  }
}
