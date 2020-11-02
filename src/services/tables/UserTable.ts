import { User, UserShell } from "../../lib/data/User";
import { Connection } from "../database/Connection";

export class UserTable {
  /**
   * Base
   */
  private static table = "user";
  static async list(): Promise<User[]> {
    return await Connection.list<User>(UserTable.table);
  }
  static async update(value: User) {
    await Connection.update<User>(UserTable.table, value);
  }
  static async insert(value: UserShell) {
    await Connection.insert<UserShell>(UserTable.table, value);
  }
  static async insertIgnoreFailure(value: UserShell) {
    await Connection.insertIgnoreFailure<UserShell>(UserTable.table, value);
  }
}
