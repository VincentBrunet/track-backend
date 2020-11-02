import { App } from "./App";
import { MetricList } from "./routes/indices/MetricList";
import { TickerList } from "./routes/indices/TickerList";
import { UnitList } from "./routes/indices/UnitList";

export class AppReader extends App {
  protected setup() {
    this.get("/indices/metric-list", MetricList);
    this.get("/indices/ticker-list", TickerList);
    this.get("/indices/unit-list", UnitList);
  }
}
