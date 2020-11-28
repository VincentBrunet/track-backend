import { Branded } from "../struct/Branded";
import { TagId } from "./Tag";
import { ValueId } from "./Value";

export type ValueTagId = Branded<number, "ValueTagId">;
export interface ValueTag extends ValueTagShell {
  id: ValueTagId;
}
export interface ValueTagShell {
  value_id: ValueId;
  tag_id: TagId;
}
