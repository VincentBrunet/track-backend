import { App } from "./App";
import { TagList } from "./routes/indices/TagList";
import { UserList } from "./routes/indices/UserList";
import { ValueList } from "./routes/indices/ValueList";
import { UploadValue } from "./routes/mutations/UploadValue";

export class AppReader extends App {
  protected setup() {
    this.get("/indices/value-list", ValueList);
    this.get("/indices/user-list", UserList);
    this.get("/indices/tag-list", TagList);

    this.post("/mutations/upload-value", UploadValue);
  }
}
