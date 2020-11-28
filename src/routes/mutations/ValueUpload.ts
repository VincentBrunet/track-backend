import { TagId } from "../../lib/data/Tag";
import { User } from "../../lib/data/User";
import {
  ValueComment,
  ValueScalar,
  ValueStamp,
  ValueTitle,
} from "../../lib/data/Value";
import { TagTable } from "../../services/tables/TagTable";
import { ValueTable } from "../../services/tables/ValueTable";
import { ValueTagTable } from "../../services/tables/ValueTagTable";
import { RouteWithAuth } from "../RouteWithAuth";
import { ErrorNotFound } from "../utils/ErrorNotFound";

export class ValueUpload extends RouteWithAuth {
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
    // Insert the new values
    const value = await ValueTable.insert({
      user_id: user.id,
      stamp: new Date() as ValueStamp,
      scalar: param.scalar as ValueScalar,
      title: param.title as ValueTitle,
      comment: param.comment as ValueComment,
    });
    // Create value link to tags
    for (const tag of tags) {
      await ValueTagTable.insert({
        tag_id: tag.id,
        value_id: value.id,
      });
    }
  }
}
