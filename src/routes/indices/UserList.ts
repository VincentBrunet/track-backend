import { UserTable } from "../../services/tables/UserTable";
import { Route } from "../Route";

export class UserList implements Route {
  async run(param: any) {
    return await UserTable.list();
  }
}
