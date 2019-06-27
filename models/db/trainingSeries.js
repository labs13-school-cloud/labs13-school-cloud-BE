const db = require("../index");

module.exports = {
  add,
  find,
  update,
  remove,
  getAll
};

/**
 * Find a training series or set of training series in the database
 *
 * @function
 *
 * @param {Object} filters - A filters object to pass to the SQL WHERE clause
 * @see https://knexjs.org/#Builder-where
 *
 * @returns {Promise} - A Promise that resolves to an array of training series objects
 */
function find(filters) {
  return db("training_series AS ts")
    .select(
      "ts.id",
      "ts.subject",
      "ts.title",
      "ts.user_id",
      "u.name"    )
    .leftJoin("users AS u", { "ts.user_id": "u.id" })
    .where(filters);
}

/**
 * Gets all of the training series in the database
 *
 * @function
 *
 * @returns {Promise} - A Promise that resolves to an array of training series objects
 */
async function getAll () {

  const trainingSeries = await db("training_series AS ts")
    .leftJoin("users AS u", { "u.id": "ts.user_id" })
    .leftJoin("training_series_volunteers AS tsv", { "tsv.training_series_id": "ts.id" })
    .select(
      "ts.id",
      "ts.subject",
      "ts.title",
      "ts.user_id",
      "u.name",
    )
  return trainingSeries
}

/**
 * Add a training series to the Database
 *
 * @function
 *
 * @param {Object} series - A series object
 * @see https://knexjs.org/#Builder-insert
 *
 * @returns {Promise} - A Promise that resolves to the newly created training series
 */
function add(series) {
  return db("training_series")
    .insert(series, ["*"])
    .then(ts => find({ "ts.id": ts[0].id }).first());
}

/**
 * Update a training series to the Database
 *
 * @function
 *
 * @param {Object} filters - A filters object to pass to the SQL WHERE clause
 * @see https://knexjs.org/#Builder-where
 *
 * @param {Object} changes - An object representing the keys to update and their values
 * @see https://knexjs.org/#Builder-update
 *
 * @returns {Promise} - A Promise that resolves to the updated training series
 */
function update(filter, changes) {
  return db("training_series as ts")
    .update(changes, ["*"])
    .where(filter)
    .then(ts => find({ "ts.id": ts[0].id }).first());
}

/**
 * Deletes a specific training series or set of training series from the database
 *
 * @function
 *
 * @param {Object} filters - A filters object to pass to the SQL WHERE clause
 * @see https://knexjs.org/#Builder-where
 *
 * @returns {Promise} A promise that resolves to the number of training series deleted
 */
function remove(filter) {
  return db("training_series")
    .where(filter)
    .del();
}
