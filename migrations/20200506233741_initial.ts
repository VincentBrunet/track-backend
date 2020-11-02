import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema

    .createTable("user", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();

      table.string("email", 1023).notNullable();

      table.unique(["email"]);
    })

    .createTable("tag", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();

      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .notNullable();

      table.string("code", 255).notNullable();
      table.string("name", 255).notNullable();

      table.unique(["code"]);
    })

    .createTable("value", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();

      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("user")
        .notNullable();

      table.timestamp("stamp", { useTz: true }).notNullable();

      table.specificType("scalar", "double precision");
      table.text("title");
      table.text("comment");
    })

    .createTable("value_tag", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary().notNullable();

      table
        .integer("value_id")
        .unsigned()
        .references("id")
        .inTable("value")
        .notNullable();
      table
        .integer("tag_id")
        .unsigned()
        .references("id")
        .inTable("tag")
        .notNullable();

      table.unique(["value_id", "tag_id"]);
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTableIfExists("value_tag")
    .dropTableIfExists("value")
    .dropTableIfExists("tag")
    .dropTableIfExists("user");
}
