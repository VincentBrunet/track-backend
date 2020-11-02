import { Tag, TagShell } from "../../lib/data/Tag";
import { Connection } from "../database/Connection";
import { User } from "../../lib/data/User";

export class TagTable {
  /**
   * Base
   */
  private static table = "tag";
  static async list(): Promise<Tag[]> {
    return await Connection.list<Tag>(TagTable.table);
  }
  static async update(value: Tag) {
    await Connection.update<Tag>(TagTable.table, value);
  }
  static async insert(value: TagShell) {
    await Connection.insert<TagShell>(TagTable.table, value);
  }
  static async insertIgnoreFailure(value: TagShell) {
    await Connection.insertIgnoreFailure<TagShell>(TagTable.table, value);
  }
  /**
   * Filtered reading
   */
  static async listForUser(user: User): Promise<Tag[]> {
    const connection = await Connection.connect();
    const query = connection.select("*").from(TagTable.table);
    return await query.where("user_id", user.id);
  }
}
