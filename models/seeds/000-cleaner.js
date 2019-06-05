exports.seed = function(knex, Promise) {
  return knex.schema.raw(
    "TRUNCATE account_types, users, training_series, classes, services, tokens, messages, notifications, responses RESTART IDENTITY;"
  );
};
