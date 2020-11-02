import { Value, ValueShell } from "../../lib/data/Value";
import { Connection } from "../database/Connection";

export class ValueTable {
  /**
   * Base
   */
  private static table = "value";
  static async list(): Promise<Value[]> {
    return await Connection.list<Value>(ValueTable.table);
  }
  static async update(value: Value) {
    await Connection.update<Value>(ValueTable.table, value);
  }
  static async insert(value: ValueShell) {
    await Connection.insert<ValueShell>(ValueTable.table, value);
  }
  static async insertIgnoreFailure(value: ValueShell) {
    await Connection.insertIgnoreFailure<ValueShell>(ValueTable.table, value);
  }
}
