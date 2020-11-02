import { Branded } from "../struct/Branded";

export type UserId = Branded<number, "UserId">;
export interface User extends UserShell {
  id: UserId;
}
export interface UserShell {
  email: string;
}
