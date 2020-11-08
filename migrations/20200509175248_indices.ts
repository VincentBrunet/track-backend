import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .alterTable("value_tag", (table: Knex.CreateTableBuilder) => {
      table.index("value_id");
      table.index("tag_id");
    })
    .alterTable("value", (table: Knex.CreateTableBuilder) => {
      table.index("user_id");
    })
    .alterTable("tag", (table: Knex.CreateTableBuilder) => {
      table.index("user_id");
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema
    .alterTable("value_tag", (table: Knex.CreateTableBuilder) => {
      table.dropIndex("value_id");
      table.dropIndex("tag_id");
    })
    .alterTable("value", (table: Knex.CreateTableBuilder) => {
      table.dropIndex("user_id");
    })
    .alterTable("tag", (table: Knex.CreateTableBuilder) => {
      table.dropIndex("user_id");
    });
}
