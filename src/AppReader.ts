import { App } from "./App";
import { ValueUpload } from "./routes/mutations/ValueUpload";
import { TagList } from "./routes/readings/TagList";
import { ValueListForTag } from "./routes/readings/ValueListForTag";
import { ValueListForTags } from "./routes/readings/ValueListForTags";
import { ValueListRecent } from "./routes/readings/ValueListRecent";

export class AppReader extends App {
  protected setup() {
    this.get("/readings/tag-list", TagList);

    this.get("/readings/value-list-recent", ValueListRecent);
    this.get("/readings/value-list-for-tag", ValueListForTag);
    this.get("/readings/value-list-for-tags", ValueListForTags);

    this.post("/mutations/value-upload", ValueUpload);
  }
}
