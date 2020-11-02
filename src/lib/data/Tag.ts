import { Branded } from "../struct/Branded";
import { UserId } from "./User";

export type TagId = Branded<number, "TagId">;
export interface Tag extends TagShell {
  id: TagId;
}
export interface TagShell {
  user_id: UserId;
  name: string;
}
