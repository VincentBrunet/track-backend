import { TagCode, TagName, TagShell } from "../../lib/data/Tag";
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

export class ValueUpload extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    const tagsByCodeBefore = await TagTable.mapByCodeForUser(user);

    const paramTags = param.tags;
    const shellTags: TagShell[] = paramTags.map((paramTag: string) => {
      return {
        user_id: user.id,
        code: paramTag as TagCode,
        name: paramTag as TagName,
      };
    });

    for (const shellTag of shellTags) {
      if (!tagsByCodeBefore.has(shellTag.code)) {
        await TagTable.insert(shellTag);
      }
    }

    const value = await ValueTable.insert({
      user_id: user.id,
      stamp: new Date() as ValueStamp,
      scalar: param.scalar as ValueScalar,
      title: param.title as ValueTitle,
      comment: param.comment as ValueComment,
    });

    const tagsByCodeAfter = await TagTable.mapByCodeForUser(user);
    for (const shellTag of shellTags) {
      const tag = tagsByCodeAfter.get(shellTag.code);
      if (tag) {
        await ValueTagTable.insert({
          tag_id: tag.id,
          value_id: value.id,
        });
      }
    }
  }
}
