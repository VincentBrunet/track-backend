import { TagId } from "../../lib/data/Tag";
import { ValueId } from "../../lib/data/Value";
import { ValueTag, ValueTagShell } from "../../lib/data/ValueTag";
import { Connection } from "../database/Connection";

export class ValueTagTable {
  /**
   * Base utilities
   */
  static table = "value_tag";
  static async update(ValueTag: ValueTag) {
    return await Connection.update<ValueTag>(ValueTagTable.table, ValueTag);
  }
  static async insert(ValueTag: ValueTagShell) {
    return await Connection.insert<ValueTagShell, ValueTag>(
      ValueTagTable.table,
      ValueTag
    );
  }
  /**
   * Filtered reading
   */
  static async listForValues(value_ids: ValueId[]): Promise<ValueTag[]> {
    const connection = await Connection.connect();
    const query = connection.select("*");
    query.from(ValueTagTable.table);
    query.whereIn("value_id", value_ids);
    return await query;
  }
  static async listForTags(tag_ids: TagId[]): Promise<ValueTag[]> {
    const connection = await Connection.connect();
    const query = connection.select("*");
    query.from(ValueTagTable.table);
    query.whereIn("tag_id", tag_ids);
    return await query;
  }
}
