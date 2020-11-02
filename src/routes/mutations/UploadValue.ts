import { TagTable } from "../../services/tables/TagTable";
import { User } from "../../lib/data/User";
import { RouteWithAuth } from "../RouteWithAuth";
import { ValueTable } from "../../services/tables/ValueTable";
import { TagShell, TagCode, TagName } from "../../lib/data/Tag";
import {
  ValueStamp,
  ValueScalar,
  ValueComment,
  ValueTitle,
} from "../../lib/data/Value";

export class UploadValue extends RouteWithAuth {
  async runWithAuth(user: User, param: any) {
    param = {
      tags: ["A", "B", "C"],
      scalar: 1,
    };

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
        //await TagTable.insert(shellTag);
      }
    }

    const res = await ValueTable.insert({
      user_id: user.id,
      stamp: new Date() as ValueStamp,
      scalar: param.scalar as ValueScalar,
      title: param.title as ValueTitle,
      comment: param.comment as ValueComment,
    });
    console.log("RES", res);

    const tagsByCodeAfter = await TagTable.mapByCodeForUser(user);
    for (const shellTag of shellTags) {
      const tag = tagsByCodeAfter.get(shellTag.code);
      if (tag) {
      }
    }
  }
}
