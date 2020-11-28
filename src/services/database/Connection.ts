import Knex from "knex";
import knexfile from "./../../config/knexfile";

const debug = false;

export interface ModelShell {}
export interface Model {
  id: number;
}

export class Connection {
  private static knex?: Knex;
  static async connect() {
    if (!Connection.knex) {
      Connection.knex = await Knex(knexfile);
    }
    return Connection.knex;
  }

  /**
   * Base operations
   */
  static async getById<T extends Model>(
    table: string,
    id: number
  ): Promise<T | undefined> {
    const connection = await Connection.connect();
    const values = await connection.select("*").where("id", id).from(table);
    if (debug) {
      console.log("getById", values);
    }
    if (values.length >= 0) {
      return values[0];
    } else {
      return undefined;
    }
  }
  static async getByIds<T extends Model>(
    table: string,
    ids: number[]
  ): Promise<T[]> {
    const connection = await Connection.connect();
    const values = await connection.select("*").whereIn("id", ids).from(table);
    if (debug) {
      console.log("getByIds", values);
    }
    return values;
  }
  static async list<T extends Model>(table: string): Promise<T[]> {
    const connection = await Connection.connect();
    const values = await connection.select("*").from(table).orderBy("id");
    if (debug) {
      console.log("list", values);
    }
    return values;
  }
  static async update<T extends Model>(table: string, value: T) {
    if (debug) {
      console.log("update", value);
    }
    const connection = await Connection.connect();
    return await connection.update(value).where("id", value.id).from(table);
  }
  static async updateBatch<T extends Model>(table: string, values: T[]) {
    if (debug) {
      console.log("update", values);
    }
    if (!values) {
      return;
    }
    const connection = await Connection.connect();
    for (const value of values) {
      await connection.update(value).where("id", value.id).from(table);
    }
  }
  static async insert<T extends ModelShell, R extends Model>(
    table: string,
    value: T
  ): Promise<R> {
    if (debug) {
      console.log("insert", value);
    }
    const connection = await Connection.connect();
    const result = await connection.insert(value).into(table).returning("*");
    return result[0];
  }
  static async insertBatch<T extends ModelShell>(table: string, values: T[]) {
    if (debug) {
      console.log("insert", values);
    }
    if (!values) {
      return;
    }
    const connection = await Connection.connect();
    return connection.batchInsert(table, values, 100);
  }

  /**
   * Base operations wrappers
   */
  static async insertIgnoreFailure<T extends ModelShell>(
    table: string,
    value: T
  ) {
    try {
      await Connection.insert(table, value);
    } catch (e) {}
  }
}
