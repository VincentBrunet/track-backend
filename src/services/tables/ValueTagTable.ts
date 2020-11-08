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
    return await Connection.update<ValueTag>(ValueTagTable.table, ValueTag);
  }
  static async insert(ValueTag: ValueTagShell) {
    return await Connection.insert<ValueTagShell, ValueTag>(
      ValueTagTable.table,
      ValueTag
    );
  }
  static async insertIgnoreFailure(ValueTag: ValueTagShell) {
    return await Connection.insertIgnoreFailure<ValueTagShell>(
      ValueTagTable.table,
      ValueTag
    );
  }
}
