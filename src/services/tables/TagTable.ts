import { Tag, TagId, TagShell } from "../../lib/data/Tag";
import { Connection } from "../database/Connection";

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
}
