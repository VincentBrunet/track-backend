import { App } from "./App";
import { UserList } from "./routes/indices/UserList";

export class AppReader extends App {
  protected setup() {
    this.get("/indices/user-list", UserList);
  }
}
