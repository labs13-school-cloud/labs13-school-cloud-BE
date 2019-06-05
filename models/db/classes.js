const db = require('../index');

module.exports = {
    find,
    add,
    update,
    remove
}

function find() {
  return db('classes');
};

// /**
//  * Find a Class 
//  * 
//  * @function
//  * 
//  * @param {Object}  filters - A filters object to pass to the SQL WHERE clause
//  * @see https://knexjs.org/#Builder-where
//  * 
//  * @returns {Promise} - A Promise that  resolves to an array of Class objects
//  */
// function find(filters) {
//     return db("classes AS c")
//         // .select(
//         //     "c.id",
//         //     "c.class_name AS name",
//         //     "c.grade_level",
//         //     "c.subject",
//         //     "c.number_of_students",
//         //     "c.volunteer_id"
//         // )
//         // .join({ "c.name" })
//         .where(filters)
        
// }

/**
 * Add a Class to the database
 * 
 * @function
 * 
 * @param {Object} classes - A class object
 * @see https://knexjs.org/#Builder-insert
 * 
 * @returns {Promise} - A Promise that resolves to the newly created Class
 */
function add(classes) {
    return db('classes AS c')
    .insert(classes, ["*"])
    .then(c => find({ "c.id": c[0].id }).first())
}

/**
 * Update a Class to the database
 * 
 * @function
 * 
 * @param {Object} filters
 * 
 * @param {Object} changes
 * 
 * @returns {Promise}
 */
function update(filters, changes) {
    return db("classes AS c")
        .update(changes, ["*"])
        .where(filters)
        .then(c => find({ "c.id": c[0].id }).first());
}

/**
 * Delete a specific Class from the database
 * 
 * @function
 * 
 * @param {Object} filters
 * 
 * @returns {Promise}
 */
function remove(filters) {
    return db("classes AS c")
        .where(filters)
        .del();
}