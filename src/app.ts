import cors from "cors";
import express from "express";
import { Cron } from "./crons/Cron";
import { Route } from "./routes/Route";

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.setup();
  }

  protected setup() {}

  protected get(path: string, handler: new () => Route) {
    console.log("route:register", "GET", path);
    this.app.get(path, this.make(new handler()));
  }

  protected post(path: string, handler: new () => Route) {
    console.log("route:register", "POST", path);
    this.app.post(path, this.make(new handler()));
  }

  protected make(route: Route) {
    return async (req: express.Request, res: express.Response) => {
      try {
        const params = {};
        Object.assign(params, req.query);
        Object.assign(params, req.params);
        Object.assign(params, req.body);
        const json = await route.run(params);
        res.status(200);
        res.header("Content-Type", "application/json");
        res.send({
          success: true,
          error: null,
          data: json,
        });
      } catch (e) {
        res.status(e.statusCode ?? 500);
        res.json({
          success: false,
          error: {
            code: e.code,
            message: e.message,
            stack: e.stack.split("\n"),
          },
          data: null,
        });
        res.end();
      }
      this.log(req, res);
    };
  }

  private log(req: express.Request, res: express.Response) {
    console.log(
      "route:run",
      req.method,
      req.route.path,
      "-->",
      res.statusCode,
      res.statusMessage
    );
  }

  listen(port: number, done: () => void) {
    console.log("app:listen", port);
    this.app.listen(port, done);
  }

  protected run(
    name: string,
    type: new () => Cron,
    delay: number,
    repeat: number
  ) {
    console.log("cron:register", name);
    const cron = new type();
    const runner = async () => {
      console.log("cron:start", name);
      try {
        await cron.run();
      } catch (e) {
        console.log("cron:error", e);
      }
      console.log("cron:end", name);
      setTimeout(() => {
        runner();
      }, repeat);
    };
    setTimeout(() => {
      runner();
    }, delay);
  }
}
