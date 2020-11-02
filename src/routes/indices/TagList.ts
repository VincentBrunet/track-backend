import { TagTable } from "../../services/tables/TagTable";
import { User } from "../../lib/data/User";
import { RouteWithAuth } from "../RouteWithAuth";

export class TagList extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    return await TagTable.listForUser(user);
  }
}
