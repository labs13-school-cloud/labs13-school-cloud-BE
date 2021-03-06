exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl.text("name").notNullable();
      tbl.text("email").notNullable();
      tbl.text("stripe");
      tbl.text("role").defaultTo("volunteer");
      tbl.boolean("approved").defaultTo(0);
      tbl.boolean("donator").defaultTo(0);
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
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
    })
    .createTable("classes", tbl => {
      tbl.increments();
      tbl.text("class_name").notNullable();
      tbl.text("grade_level").notNullable();
      tbl.text("subject");
      tbl.text("teacher_name");
      tbl.integer("number_of_students");
    })
    .createTable("classes_volunteers", tbl => {
      tbl.increments();
      tbl
        .integer("volunteer_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("class_id")
        .references("id")
        .inTable("classes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
    })
    .createTable("training_series", tbl => {
      tbl.increments();
      tbl.text("title").notNullable();
      tbl.text("subject");
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
    })

    .createTable("training_series_volunteers", tbl => {
      tbl.increments();
      tbl.boolean("finished");
      tbl
        .integer("volunteer_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("training_series_id")
        .references("id")
        .inTable("training_series")
        .onDelete("CASCADE")
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
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
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
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("service_id")
        .references("id")
        .inTable("services")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("recipient_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
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
        .onDelete("CASCADE")
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
    .dropTableIfExists("training_series_volunteers")
    .dropTableIfExists("training_series")
    .dropTableIfExists("classes_volunteers")
    .dropTableIfExists("classes")
    .dropTableIfExists("tokens")
    .dropTableIfExists("services")
    .dropTableIfExists("users");
};
