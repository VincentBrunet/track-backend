import { Tag } from "../../lib/data/Tag";
import { User } from "../../lib/data/User";
import { Value, ValueId, ValueShell } from "../../lib/data/Value";
import { Connection } from "./../database/Connection";
import { ValueTagTable } from "./ValueTagTable";

export class ValueTable {
  /**
   * Base utilities
   */
  static table = "value";
  static async update(value: Value) {
    return await Connection.update<Value>(ValueTable.table, value);
  }
  static async insert(value: ValueShell) {
    return await Connection.insert<ValueShell, Value>(ValueTable.table, value);
  }
  /**
   * Filtered reading
   */
  static async listRecentForUser(user: User, limit: number): Promise<Value[]> {
    const connection = await Connection.connect();
    const query = connection.select("*").from(ValueTable.table);
    query.orderBy("stamp", "desc");
    query.limit(limit);
    query.where("user_id", user.id);
    return await query;
  }
  static async listForTag(tag: Tag): Promise<Value[]> {
    const connection = await Connection.connect();
    const query = connection.select(ValueTable.table + ".*");
    query.from(ValueTable.table);
    query.leftJoin(
      ValueTagTable.table,
      ValueTable.table + ".id",
      ValueTagTable.table + ".value_id"
    );
    query.where(ValueTagTable.table + ".tag_id", tag.id);
    return await query;
  }
  static async listForIds(user: User, value_ids: ValueId[]) {
    const connection = await Connection.connect();
    const query = connection.select(ValueTable.table + ".*");
    query.from(ValueTable.table);
    query.where("user_id", user.id);
    return await query;
  }
}
