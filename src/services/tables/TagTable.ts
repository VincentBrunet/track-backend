import { Tag, TagCode, TagId, TagShell } from "../../lib/data/Tag";
import { User } from "../../lib/data/User";
import { Connection } from "../database/Connection";

export class TagTable {
  /**
   * Base
   */
  static table = "tag";
  static async list(): Promise<Tag[]> {
    return await Connection.list<Tag>(TagTable.table);
  }
  static async update(value: Tag) {
    return await Connection.update<Tag>(TagTable.table, value);
  }
  static async insert(value: TagShell) {
    return await Connection.insert(TagTable.table, value);
  }
  static async insertIgnoreFailure(value: TagShell) {
    return await Connection.insertIgnoreFailure<TagShell>(
      TagTable.table,
      value
    );
  }
  /**
   * Filtered reading
   */
  static async listForUser(user: User): Promise<Tag[]> {
    const connection = await Connection.connect();
    const query = connection.select("*").from(TagTable.table);
    return await query.where("user_id", user.id);
  }
  /**
   * Indexed reading
   */
  static async mapByIdForUser(user: User) {
    const list = await TagTable.listForUser(user);
    const mapping = new Map<TagId, Tag>();
    for (const item of list) {
      mapping.set(item.id, item);
    }
    return mapping;
  }
  static async mapByCodeForUser(user: User) {
    const list = await TagTable.listForUser(user);
    const mapping = new Map<TagCode, Tag>();
    for (const item of list) {
      mapping.set(item.code, item);
    }
    return mapping;
  }
}
