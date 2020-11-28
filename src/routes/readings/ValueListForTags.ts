import { User } from "../../lib/data/User";
import { Value, ValueId } from "../../lib/data/Value";
import { TagTable } from "../../services/tables/TagTable";
import { ValueTable } from "../../services/tables/ValueTable";
import { RouteWithAuth } from "../RouteWithAuth";
import { TagId } from "./../../lib/data/Tag";
import { ErrorNotFound } from "./../utils/ErrorNotFound";

export class ValueListForTags extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    // Resolve tags
    const paramIds = param.tag_ids;
    if (paramIds === undefined || paramIds.length <= 0) {
      throw new ErrorNotFound("no tag specified");
    }
    const tagMapById = await TagTable.mapByIdForUser(user);
    const tags = paramIds.map((id: string) => {
      const tag = tagMapById.get(parseInt(id) as TagId);
      if (!tag) {
        throw new ErrorNotFound("tag not found: " + id);
      }
      return tag;
    });
    // List all values for tags
    const tagCount = tags.length;
    const findsById = new Map<ValueId, number>();
    const valuesById = new Map<ValueId, Value>();
    for (const tag of tags) {
      const valueListForTag = await ValueTable.listForTag(tag);
      for (const value of valueListForTag) {
        const id = value.id;
        findsById.set(id, (findsById.get(id) ?? 0) + 1);
        valuesById.set(id, value);
      }
    }
    // Resolve the final set of values
    const values: Value[] = [];
    if (param.condition === "or") {
      for (const value of valuesById.values()) {
        values.push(value);
      }
    } else {
      for (const value of valuesById.values()) {
        if (findsById.get(value.id) === tagCount) {
          values.push(value);
        }
      }
    }
    // Optionally sort
    if (param.sort === "asc") {
      values.sort((a, b) => {
        return a.stamp.valueOf() - b.stamp.valueOf();
      });
    } else if (param.sort === "desc") {
      values.sort((a, b) => {
        return b.stamp.valueOf() - a.stamp.valueOf();
      });
    }
    // Done
    return values;
  }
}
