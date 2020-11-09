import { Tag } from "../../lib/data/Tag";
import { User } from "../../lib/data/User";
import { Value, ValueShell } from "../../lib/data/Value";
import { Connection } from "./../database/Connection";
import { ValueTagTable } from "./ValueTagTable";

export class ValueTable {
  /**
   * Base
   */
  static table = "value";
  static async list(): Promise<Value[]> {
    return await Connection.list<Value>(ValueTable.table);
  }
  static async update(value: Value) {
    return await Connection.update<Value>(ValueTable.table, value);
  }
  static async insert(value: ValueShell) {
    return await Connection.insert<ValueShell, Value>(ValueTable.table, value);
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
  static async listRecentForUser(user: User, limit: number): Promise<Value[]> {
    const connection = await Connection.connect();
    const query = connection.select("*").from(ValueTable.table);
    query.orderBy("stamp", "desc");
    query.limit(limit);
    return await query.where("user_id", user.id);
  }
  static async listForTag(tag: Tag) {
    const connection = await Connection.connect();
    const query = connection.select("value.*").from(ValueTable.table);
    query.leftJoin(
      ValueTagTable.table,
      ValueTable.table + ".id",
      ValueTagTable.table + ".value_id"
    );
    return await query.where(ValueTagTable.table + ".tag_id", tag.id);
  }
}
