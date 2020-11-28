import { User } from "../lib/data/User";
import { UserTable } from "../services/tables/UserTable";
import { Route } from "./Route";

export class RouteWithAuth implements Route {
  async run(param: any) {
    // TODO - this is mocked for now
    const user = await UserTable.demo();
    param.token = undefined;
    return await this.runWithAuth(user, param);
  }
  async runWithAuth(user: User, param: any): Promise<any> {}
}
