import { App } from "./App";
import { ValueUpload } from "./routes/mutations/ValueUpload";
import { MappingForValues } from "./routes/readings/MappingForValues";
import { TagList } from "./routes/readings/TagList";
import { TagListForValues } from "./routes/readings/TagListForValues";
import { ValueListForTags } from "./routes/readings/ValueListForTags";
import { ValueListRecent } from "./routes/readings/ValueListRecent";

export class AppReader extends App {
  protected setup() {
    this.get("/readings/tag-list", TagList);
    this.get("/readings/tag-list-for-values", TagListForValues);

    this.get("/readings/value-list-recent", ValueListRecent);
    this.get("/readings/value-list-for-tags", ValueListForTags);

    this.get("/readings/mapping-for-values", MappingForValues);

    this.post("/mutations/value-upload", ValueUpload);
  }
}
