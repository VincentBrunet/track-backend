import { TagId } from "./../../lib/data/Tag";
import { User } from "../../lib/data/User";
import { Value, ValueId } from "../../lib/data/Value";
import { TagTable } from "../../services/tables/TagTable";
import { ValueTable } from "../../services/tables/ValueTable";
import { ErrorNotFound } from "./../utils/ErrorNotFound";
import { RouteWithAuth } from "../RouteWithAuth";

export class ValueListForTags extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    const tagMapById = await TagTable.mapByIdForUser(user);
    const tags = param.ids?.map((id: string) => {
      const tag = tagMapById.get(parseInt(id) as TagId);
      if (!tag) {
        throw new ErrorNotFound("tag not found: " + id);
      }
      return tag;
    });

    const tagCount = tags.length;
    if (tagCount <= 0) {
      throw new ErrorNotFound("no tag passed");
    }

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

    if (param.sort === "stamp") {
      values.sort((a, b) => {
        return a.stamp.valueOf() - b.stamp.valueOf();
      });
    }

    return values;
  }
}
