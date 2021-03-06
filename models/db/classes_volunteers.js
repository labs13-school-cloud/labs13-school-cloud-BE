const db = require("../index");

module.exports = {
  find,
  add,
  remove,
  findVolunteerCL
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
      "cv.class_id",
      "u.name",
      "u.email",
      "c.class_name",
      "c.subject",
      "c.teacher_name",
      "c.number_of_students"
    )
    .leftJoin("classes AS c", { "c.id": "cv.class_id" })
    .leftJoin("users AS u", { "cv.volunteer_id": "u.id" })
    .where(filters)
    .orderBy("cv.class_id");
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
function add(relation) {
  return db("classes_volunteers")
    .insert(relation, ["*"])
    .then(r =>
      find({
        "cv.volunteer_id": r[0].volunteer_id,
        "cv.class_id": r[0].class_id
      }).first()
    );
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
  return db("classes_volunteers as cv")
    .where(filter)
    .del();
}

/**
 * Finds a list of classes for a particular volunteer
 *
 * @function
 * @param  {Object} filters - A filter object to be passed to the "where" clause
 * @returns {Promise} Promise that resolves to the an array of volunteers;
 */
function findVolunteerCL(filters) {
  return db("classes AS c")
    .select(
      "c.id",
      "c.class_name",
      "c.grade_level",
      "c.subject",
      "c.teacher_name",
      "c.number_of_students",
      "cv.volunteer_id",
      "u.name"
    )
    .leftJoin("classes_volunteers AS cv", {
      "c.id": "cv.class_id"
    })
    .leftJoin("users AS u", { "cv.volunteer_id": "u.id" })
    .where(filters)
    .orderBy("c.id");
}
