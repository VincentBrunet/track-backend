import { Value, ValueShell } from "../../lib/data/Value";
import { Connection } from "../database/Connection";
import { User } from "../../lib/data/User";

export class ValueTable {
  /**
   * Base
   */
  private static table = "value";
  static async list(): Promise<Value[]> {
    return await Connection.list<Value>(ValueTable.table);
  }
  static async update(value: Value) {
    return await Connection.update<Value>(ValueTable.table, value);
  }
  static async insert(value: ValueShell) {
    console.log(" value", value);
    return await Connection.insert<ValueShell>(ValueTable.table, value);
  }
  static async insertIgnoreFailure(value: ValueShell) {
    return await Connection.insertIgnoreFailure<ValueShell>(
      ValueTable.table,
      value
    );
  }
  /**
   * Filtered reading
   */
  static async listForUser(user: User): Promise<Value[]> {
    const connection = await Connection.connect();
    const query = connection.select("*").from(ValueTable.table);
    return await query.where("user_id", user.id);
  }
}
