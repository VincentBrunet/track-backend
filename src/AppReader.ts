import { App } from "./App";
import { UserList } from "./routes/indices/UserList";
import { TagList } from "./routes/indices/TagList";
import { UploadValue } from "./routes/mutations/UploadValue";
import { ValueList } from "./routes/indices/ValueList";

export class AppReader extends App {
  protected setup() {
    this.get("/indices/value-list", ValueList);
    this.get("/indices/user-list", UserList);
    this.get("/indices/tag-list", TagList);

    this.get("/mutations/upload-value", UploadValue);
  }
}
