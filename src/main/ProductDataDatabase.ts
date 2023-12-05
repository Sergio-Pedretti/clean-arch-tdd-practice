import { Database } from "./Database";
import { ProductData } from "./ProductData";

export class ProductDataDatabase extends Database implements ProductData {
  async getProduct(id: number) {
    this.openConnection();
    const [product] = await this.connection.query(
      "select * from branas_store.product JOIN branas_store.product_dimensions ON branas_store.product_dimensions.fk_product=branas_store.product.id_product where id_product = $1",
      [id]
    );
    await this.closeConnection();
    return product;
  }
}
