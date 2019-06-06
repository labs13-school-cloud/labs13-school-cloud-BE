const db = require("../index");

module.exports = {
	find,
    add,
    remove
};

/**
 * Finds a set of volunteers or particular volunteer part of a training series
 *
 * @function
 * @param  {Object} filters - A filter object to be passed to the "where" clause
 * @returns {Promise} Promise that resolves to the an array of volunteers;
 */
function find(filters) {
	return db("training_series_volunteers AS tsv")
		.select(
			"tsv.id",
			"tsv.volunteer_id",
			"tsv.training_series_id",
			"u.first_name",
			"u.last_name",
			"u.email",
			"u.role",
			"u.approved",
		)
		.leftJoin("training_series AS ts", { "ts.id": "tsv.training_series_id" })
		.leftJoin("users AS u", { "u.id": "tsv.volunteer_id" })
		.where(filters)
		.orderBy("id");
}

/**
 * Adds a volunteers to a training series
 *
 * @function
 * @param  {Object} relation - A relation object that contains the training series id and volunteer id (user_id to add)
 * @returns {Promise} Promise that resolves to the new relation;
 */
function add(relation) {
	return db("training_series_volunteers")
		.insert(relation, ["*"])
		.then(r =>
			find({
				"tsv.volunteer_id": r[0].volunteer_id,
				"tsv.training_series_id": r[0].training_series_id,
			}).first(),
		);
}

function remove(filter) {
	return db("training_series_volunteers AS tsv")
		.where(filter)
		.delete();
}