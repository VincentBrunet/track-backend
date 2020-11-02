import { Route } from "./Route";
import { UserTable } from "../services/tables/UserTable";
import { User, UserEmail } from "../lib/data/User";

export class RouteWithAuth implements Route {
  async run(param: any) {
    // TODO this is mocked
    let users = await UserTable.list();
    if (users.length < 1) {
      await UserTable.insert({
        email: "wincerouge@gmail.com" as UserEmail,
      });
      users = await UserTable.list();
    }
    param.token = undefined;
    return await this.runWithAuth(users[0], param);
  }
  async runWithAuth(user: User, param: any): Promise<any> {}
}
