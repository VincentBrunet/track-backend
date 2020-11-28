import { TagId } from "../../lib/data/Tag";
import { User } from "../../lib/data/User";
import { TagTable } from "../../services/tables/TagTable";
import { ValueTagTable } from "../../services/tables/ValueTagTable";
import { RouteWithAuth } from "../RouteWithAuth";
import { ErrorNotFound } from "../utils/ErrorNotFound";

export class TagListForValues extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    // Resolve param values ids
    const paramIds = param.value_ids;
    if (paramIds === undefined || paramIds.length <= 0) {
      throw new ErrorNotFound("no value specified");
    }
    // Resolve linked tag ids
    const valuesTags = await ValueTagTable.listForValues(paramIds);
    const tagIds = new Set<TagId>();
    for (const valueTag of valuesTags) {
      tagIds.add(valueTag.tag_id);
    }
    // Resolve tags
    const tagsById = await TagTable.mapByIdForUser(user);
    return [...tagIds].map((tagId) => {
      return tagsById.get(tagId);
    });
  }
}
