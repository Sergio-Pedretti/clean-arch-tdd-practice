import pgp from "pg-promise";

export class Database {
  connection: any;
  constructor() {}

  openConnection() {
    this.connection = pgp()(
      "postgres://sergiopedretti:postgres@localhost:5432/app"
    );
  }

  async closeConnection() {
    await this.connection.$pool.end();
  }
}
