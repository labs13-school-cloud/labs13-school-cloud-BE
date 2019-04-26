exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("account_types", tbl => {
      tbl.increments();
      tbl.text("account_type");
      tbl.integer("max_notification_count");
    })
    .createTable("users", tbl => {
      tbl.increments();
      tbl.text("name");
      tbl
        .text("email")
        .unique()
        .notNullable();
      tbl.text("stripe");
      tbl.integer("notification_count").defaultTo(0);
      tbl
        .integer("account_type_id")
        .references("id")
        .inTable("account_types")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .defaultTo(1);
    })
    .createTable("training_series", tbl => {
      tbl.increments();
      tbl.text("title");
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("team_members", tbl => {
      tbl.increments();
      tbl.text("first_name");
      tbl.text("last_name");
      tbl.text("job_description");
      tbl.text("email");
      tbl.text("phone_number");
      tbl.boolean("text_on").defaultTo(false);
      tbl.boolean("email_on").defaultTo(false);
      tbl.text("slack_id");
      tbl.text("teams_id");
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("relational_table", tbl => {
      tbl.increments();
      tbl.date("start_date");
      tbl
        .integer("team_member_id")
        .references("id")
        .inTable("team_members")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("training_series_id")
        .references("id")
        .inTable("training_series")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("messages", tbl => {
      tbl.increments();
      tbl.text("message_name");
      tbl.text("message_details");
      tbl.text("link");
      tbl.integer("days_from_start");
      tbl
        .integer("training_series_id")
        .references("id")
        .inTable("training_series")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("notifications", tbl => {
      tbl.increments();
      tbl.date("send_date").notNullable();
      tbl.text("message_name").notNullable();
      tbl.text("message_details").notNullable();
      tbl.text("link").notNullable();
      tbl.text("phone_number").notNullable();
      tbl.text("email");
      tbl.text("first_name");
      tbl.text("last_name");
      tbl
        .integer("message_id")
        .references("id")
        .inTable("messages")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("team_member_id")
        .references("id")
        .inTable("team_members")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.integer("days_from_start");
      tbl.text("job_description");
      tbl.integer("training_series_id").notNullable();
      tbl.integer("user_id").notNullable();
      tbl.boolean("text_sent").notNullable();
      tbl.boolean("email_sent").notNullable();
      tbl.boolean("text_on").notNullable();
      tbl.boolean("email_on").notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("notifications")
    .dropTableIfExists("messages")
    .dropTableIfExists("relational_table")
    .dropTableIfExists("team_members")
    .dropTableIfExists("training_series")
    .dropTableIfExists("users")
    .dropTableIfExists("account_types");
};