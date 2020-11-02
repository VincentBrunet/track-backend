import { ValueTag, ValueTagShell } from "../../lib/data/ValueTag";
import { Connection } from "../database/Connection";

export class ValueTagTable {
  /**
   * Base
   */
  private static table = "value_tag";
  static async list(): Promise<ValueTag[]> {
    return await Connection.list<ValueTag>(ValueTagTable.table);
  }
  static async update(ValueTag: ValueTag) {
    await Connection.update<ValueTag>(ValueTagTable.table, ValueTag);
  }
  static async insert(ValueTag: ValueTagShell) {
    await Connection.insert<ValueTagShell>(ValueTagTable.table, ValueTag);
  }
  static async insertIgnoreFailure(ValueTag: ValueTagShell) {
    await Connection.insertIgnoreFailure<ValueTagShell>(
      ValueTagTable.table,
      ValueTag
    );
  }
}
