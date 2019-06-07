const db = require("../index")

module.exports = {
    find
};

/**
 * Find a list of volunteers associated with a certain class
 * 
 * @function
 * @param {Object} filters - A filters object to be passed to the "where" clause
 * @returns {Promise} - A Promise that resolves to an array of volunteers
 */
function find(filters) {
    return db("classes_volunteers AS cv")
        .select(
            "cv.id",
            "cv.volunteer_id",
            "cv.classes_id",
            "u.first_name",
            "u.last_name",
            "u.email",
            "u.role",
            "u.approved",
        )
        .leftJoin("classes AS c", { "c.id": "cv.classes_id" })
        .leftJoin("users AS u", { "u.id": "cv.volunteer_id" })
        .where(filters)
        .orderBy("id")
}