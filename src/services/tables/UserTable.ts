import { User, UserEmail, UserShell } from "../../lib/data/User";
import { Connection } from "../database/Connection";

export class UserTable {
  /**
   * Base utilities
   */
  static table = "user";
  private static async list(): Promise<User[]> {
    return await Connection.list<User>(UserTable.table);
  }
  static async update(value: User) {
    return await Connection.update<User>(UserTable.table, value);
  }
  static async insert(value: UserShell) {
    return await Connection.insert<UserShell, User>(UserTable.table, value);
  }
  /**
   * Filtered reading
   */
  static async demo(): Promise<User> {
    let users = await UserTable.list();
    if (users.length < 1) {
      await UserTable.insert({
        email: "wincerouge@gmail.com" as UserEmail,
      });
      users = await UserTable.list();
    }
    return users[0];
  }
}
