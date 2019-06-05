const db = require('../index');

module.exports = {
    find
}

/**
 * Find a Class 
 * 
 * @function
 * 
 * @param {Object}  filters - A filters object to pass to the SQL WHERE clause
 * @see https://knexjs.org/#Builder-where
 * 
 * @returns {Promise} - A Promise that  resolves to an array of Class objects
 */
function find(filters) {
    return db("classes AS c")
        .select(
            "c.id",
            "c.class_name",
            "c.grade_level",
            "c.subject",
            "c.number_of_students",
            "c.volunteer_id"
        )
        //
        //
        //
        .where(filters)
}


