import { User } from "../../lib/data/User";
import { ValueTable } from "../../services/tables/ValueTable";
import { RouteWithAuth } from "../RouteWithAuth";

export class ValueListRecent extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    return await ValueTable.listRecentForUser(user, 100);
  }
}
