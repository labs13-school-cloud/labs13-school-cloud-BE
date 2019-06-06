const db = require("../index");

module.exports = {
	find,
};

function find(filters) {
	return (
		db("training_series_volunteers AS tsv")
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
			// .leftJoin("users AS u", { "u.id": "tsv.volunteer.id" })
			.leftJoin("training_series AS ts", { "ts.id": "tsv.training_series" })
			.leftJoin("users AS u", { "u.id": "tsv.volunteer_id" })
			.where(filters)
	);
}
