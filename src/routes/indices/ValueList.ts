import { ValueTable } from "../../services/tables/ValueTable";
import { User } from "../../lib/data/User";
import { RouteWithAuth } from "../RouteWithAuth";

export class ValueList extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    return await ValueTable.listForUser(user);
  }
}
