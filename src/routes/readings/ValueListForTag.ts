import { TagId } from "./../../lib/data/Tag";
import { User } from "../../lib/data/User";
import { TagTable } from "../../services/tables/TagTable";
import { ValueTable } from "../../services/tables/ValueTable";
import { ErrorNotFound } from "./../utils/ErrorNotFound";
import { RouteWithAuth } from "../RouteWithAuth";

export class ValueListForTag extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    const tagMapById = await TagTable.mapByIdForUser(user);
    const tag = tagMapById.get(parseInt(param.id) as TagId);
    if (!tag) {
      throw new ErrorNotFound("tag not found: " + param.id);
    }
    return await ValueTable.listForTag(tag);
  }
}
