exports.seed = function(knex, Promise) {
  return knex.schema.raw(
    "TRUNCATE users, training_series, classes, services, tokens, messages, notifications, responses RESTART IDENTITY;"
  );
};
