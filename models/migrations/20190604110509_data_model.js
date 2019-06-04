exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl.text("first_name").notNullable();
      tbl.text("last_name").notNullable();
      tbl.text("email").notNullable();
      tbl.text("stripe");
      tbl.boolean("approved");
      tbl.boolean("donator");
    })
    .createTable("services", tbl => {
      tbl.increments();
      tbl.text("name").notNullable();
    })
    .createTable("tokens", tbl => {
      tbl.increments();
      tbl.datetime("expiration");
      tbl.text("auth_token").notNullable();
      tbl.text("refresh_token");
      tbl
        .integer("service_id")
        .references("id")
        .inTable("services")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
    })
    .createTable("classes", tbl => {
      tbl.increments();
      tbl.text("class_name").notNullable();
      tbl.text("grade_level").notNullable();
      tbl.text("subject").notNullable();
      tbl.integer("number_of_students");
      tbl.integer("volunteer_id").notNullable();
    })
    .createTable("training_series", tbl => {
      tbl.increments();
      tbl.text("title").notNullable();
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
    })
    .createTable("messages", tbl => {
      tbl.increments();
      tbl.text("subject").notNullable();
      tbl.text("body").notNullable();
      tbl.text("link");
      tbl
        .integer("training_series_id")
        .references("id")
        .inTable("training_series")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
      tbl.boolean("for_volunteer").notNullable();
      tbl.integer("days_from_start").notNullable();
    })
    .createTable("notifications", tbl => {
      tbl.increments();
      tbl.datetime("send_date").notNullable();
      tbl
        .boolean("is_sent")
        .notNullable()
        .defaultTo(false);
      tbl
        .integer("num_attempts")
        .notNullable()
        .defaultTo(0);
      tbl.text("thread");
      tbl
        .integer("message_id")
        .references("id")
        .inTable("messages")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("service_id")
        .references("id")
        .inTable("services")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("recipient_id")
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
    })
    .createTable("responses", tbl => {
      tbl.increments();
      tbl.text("body");
      tbl
        .integer("notification_id")
        .references("id")
        .inTable("notifications")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("responses")
    .dropTableIfExists("notifications")
    .dropTableIfExists("messages")
    .dropTableIfExists("training_series")
    .dropTableIfExists("classes")
    .dropTableIfExists("tokens")
    .dropTableIfExists("services")
    .dropTableIfExists("users");
};
