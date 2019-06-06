const db = require("../index.js");

module.exports = {
  add,
  find,
  update,
  remove
};

function find(filters) {
  if (filters) {
    return db("users AS u")
      .select(
        "u.id AS id",
        "u.first_name AS first_name",
        "u.last_name AS last_name",
        "u.email AS email",
        "u.stripe AS stripe",
      )
      .where(filters);
  }
  return db("users AS u")
    .select(
      "u.id AS id",
      "u.first_name AS first_name",
      "u.last_name AS last_name",
      "u.email AS email",
      "u.stripe AS stripe",
    )
}

function add(user) {
  return db("users")
    .insert(user, ["*"])
    .then(u => find({ "u.id": u[0].id }).first());
}

function update(filter, changes) {
  return db("users")
    .update(changes, ["*"])
    .where(filter)
    .then(u => find({ "u.id": u[0].id }).first());
}

function remove(filter) {
  return db("users")
    .where(filter)
    .del();
}
