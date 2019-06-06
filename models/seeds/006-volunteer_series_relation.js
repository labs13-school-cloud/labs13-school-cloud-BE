const { addVolunteersToSeries } = require("../../helpers/fakeData");

exports.seed = function(knex, Promise) {
	return knex("training_series_volunteers").then(function() {
		return knex("training_series_volunteers").insert(addVolunteersToSeries());
	});
};
