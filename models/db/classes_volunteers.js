const db = require("../index")

module.exports = {
    find,
    add,
    remove
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

/**
 * Add a volunteer to a class
 * 
 * @function
 * 
 * @param {Object} relation - A  relation object that contains the classes_id and the volunteer id
 * 
 * @returns {Promise} - A Promise that resolves to the new relation
 */
function add(relation){
    return db("classes_volunteers")
        .insert(relation, ["*"])
        .then(r => 
            find({
                "cv.volunteer_id":  r[0].volunteer_id,
                "cv.class_id": r[0].classes_id,
                "u.role": "volunteer"
            }).first(),
        )
}

/**
 * Removes a volunteer from a class
 * 
 * @function
 *
 * @param {Object} 
 * 
 * @returns  
 */
function remove(filter) {
    return db("classes_volunteers")
        .where(filter)
        .del();
}