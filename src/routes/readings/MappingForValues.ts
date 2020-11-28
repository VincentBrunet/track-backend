import { TagId } from "../../lib/data/Tag";
import { User } from "../../lib/data/User";
import { ValueId } from "../../lib/data/Value";
import { MapArray } from "../../lib/struct/MapArray";
import { ValueTagTable } from "../../services/tables/ValueTagTable";
import { RouteWithAuth } from "../RouteWithAuth";
import { ErrorNotFound } from "../utils/ErrorNotFound";

export class MappingForValues extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    // Resolve param values ids
    const paramIds = param.value_ids;
    if (paramIds === undefined || paramIds.length <= 0) {
      throw new ErrorNotFound("no value specified");
    }
    // Resolve linked tag ids
    const valuesTags = await ValueTagTable.listForValues(paramIds);
    const valueIdsByTagId = new MapArray<ValueId, TagId>();
    const tagIdsByValueId = new MapArray<TagId, ValueId>();
    for (const valueTag of valuesTags) {
      const tagId = valueTag.tag_id;
      const valueId = valueTag.value_id;
      valueIdsByTagId.push(valueId, tagId);
      tagIdsByValueId.push(tagId, valueId);
    }
    // Serialize
    const valuesByTag: any = {};
    const tagsByValue: any = {};
    valueIdsByTagId.forEach((tagIds: TagId[], valueId: ValueId) => {
      tagsByValue[valueId] = tagIds;
    });
    tagIdsByValueId.forEach((valueIds: ValueId[], tagId: TagId) => {
      valuesByTag[tagId] = valueIds;
    });
    return {
      valuesByTag: valuesByTag,
      tagsByValue: tagsByValue,
    };
  }
}
