const db = require("../index");

module.exports = {
	find,
	add,
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
			// ! Remember to updated to id once added
			"tsv.training_series",
			"u.first_name",
			"u.last_name",
			"u.email",
			"u.role",
			"u.approved",
			"ts.title AS series",
		)
		.leftJoin("training_series AS ts", { "ts.id": "tsv.training_series" })
		.leftJoin("users AS u", { "u.id": "tsv.volunteer_id" })
		.where(filters);
}

function add(volunteer) {
    return db("training_series_volunteers")
        .insert(volunteer, ["*"])
        .then(v => console.log(v));
}
