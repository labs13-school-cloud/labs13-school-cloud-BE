// Dependencies
const router = require("express").Router();

// Models

const Classes = require("../models/db/classes");
const ClassesVolunteers = require("../models/db/classes_volunteers");
const Users = require("../models/db/users");

// Data validation

const validation = require("../middleware/dataValidation");

// Routes

router.route("/").get((req, res) => {
  /**
   * Get all Classes
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   *
   * @returns {Object} - Express response object
   */

  //Return the Classes found to the user
  Classes.find()
    .then(Classes => {
      res.status(200).json(Classes);
    })
    .catch(err => {
      res.status(500).json({ err: "This class could not be retrieved" });
    });
});

router.route("/:id").get((req, res) => {
  /**
   * Get Classes by ID
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   *
   * @returns {Object} - Express response object
   */
  // Destructure the Message ID from the request parameters
  const { id } = req.params;

  // Return a Class to the user
  Classes.findById(id)
    .then(classes => {
      res.status(200).json(classes);
    })
    .catch(err => {
      res.status(500).json({ err: "This class could not be retrieved" });
    });
});

router.route("/").post(async (req, res) => {
  /**
   * Get Classes by ID
   *
   * @function
   *
   * @param {Object} req - Express request object
   *      * @param {Object} req.body - The request body, which represents a new Class
   * @param {Object} res - Express response object
   *
   * @returns {Object} - Express response object
   */
  // Deconstructure the req body.
  const { class_name, grade_level, subject, number_of_students } = req.body;

  // Add the new class  to the database
  const newClass = await Classes.add({
    class_name,
    grade_level,
    subject,
    number_of_students
  });

  // Return the newly created classs to the user
  return res.status(201).json({ newClass });
});

router.route("/:id").put(async (req, res) => {
  /**
   * Update the specified class in the database
   *
   *
   * @function
   * @param {Object} req - The Express request object
   * @param {Object} req.body - The request body, which represents the changes we need to make to a specific classs
   * @param {Object} res - The Express response object
   * @returns {Object} - The Express response object
   */
  // Destructure the ID off the request parameters
  const { id } = req.params;

  // Update the specific class in the database
  const updatedClass = await Classes.update({ "c.id": id }, req.body);

  // If the class they're looking for isn't found, return a 404 and message.
  if (!updatedClass) {
    return res.status(404).json({
      message: "Sorry, we couldn't find that class!"
    });
  }

  // Return a success message
  return res
    .status(200)
    .json({ message: "This class has been successfully updated!" });
});

router.route("/:id").delete(async (req, res) => {
  /**
   * delete a specific class
   *
   * @function
   * @param {Object} req - The Express request object
   * @param {Object} res - The Express response object
   * @returns {Object} - The Express response object
   */
  // Destructure the ID off of the request object
  const { id } = req.params;

  // Attempt to delete the specified Team Member from the database
  const deleted = await Classes.remove({ id });

  // If no class with the specified ID is found
  if (!deleted) {
    return res.status(404).json({
      error: "This class could not be found."
    });
  }
  // Respond to the client with a success message
  return res.status(200).json({
    message: "This class has been deleted."
  });
});

router.route("/:id/volunteers").get(async (req, res) => {
  /**
   * Get all the volunteers associated with a specific class
   *
   * @funcion
   *
   * @param {Object} req - The Express request object
   * @param {Object}res -  The Express response object
   *
   * @returns {Object} - The Express response object
   */
  // Destructure the IDfromthe req.params
  const { id } = req.params;

  // Store the class
  const classes = await Classes.find({ "c.id": id });

  // If the class they are looking for doesnt exist:
  if (!classes) {
    return res.status(404).json({
      message: "Sorry! The class you are looking for does not exist."
    });
  }

  // Find the users who are volunteers and the class id matches their id
  const volunteers = await ClassesVolunteers.find({
    "cv.classes_id": id,
    "users.role": "volunteer"
  });

  // If there are no volunteers assigned to this class:
  if (!volunteers.length) {
    res.status(404).json({
      message:
        "This class currently does not have any volunteers assigned to it."
    });
  }

  // Success - Returns an array of volunteers
  res.status(200).json({ class_name, volunteers });
});

router.route("/:id/volunteers").post(async (req, res) => {
  const { user_id: volunteer_id } = req.body;
  const { id: class_id } = req.params;

  const relation = await ClassesVolunteers.find({
    "cv.volunteer_id": volunteer_id,
    "cv.class_id": class_id
  }).first();

  if (relation) {
    return res
      .status(400)
      .json({ message: "This volunteer is already assigned to this class." });
  }

  const newRelation = await ClassesVolunteers.add({
    volunteer_id,
    class_id
  });

  return res.status(200).json({ newRelation });
});

router.route("/:id/volunteers/:user_id").delete(async (req, res) => {
  const { id: classes_id, user_id: volunteer_id } = req.params;

  const volunteer = await ClassesVolunteers.find({
    "cv.volunteer_id": volunteer_id,
    "cv.classes_id": classes_id
  });

  if (!volunteer) {
    return res
      .status(404)
      .json({ message: "This volunteer does not belong to this class." });
  }

  const deleted = await ClassesVolunteers.remove({
    "cv.volunteer_id": volunteer_id,
    "cv.classes_id": classes_id
  });

  return res.status(200).json({
    deleted,
    message: "This volunteer has successfully been removed from this class."
  });
});
// Get request /api/classes/volunteers/:user_id
router.get("/volunteers/:user_id", async (req, res) => {
  /**
   * get a volunteers specific classes
   *
   * @function
   * @param {Object} req - The Express request object
   * @param {Object} res - The Express response object
   * @returns {Object} - The Express response object
   */
  const { user_id: volunteer_id } = req.params;
  // Destructure the ID from the req.params

  const volunteer = await Users.find({
    "u.id": volunteer_id
  }); // Search for volunteer and store in a variable

  if (!volunteer.length) {
    // Checks it user does not have any classes assigned to them
    return res.status(404).json({
      message: "Sorry! That volunteer is not assigned to any classes."
    });
  }
  const classes = await ClassesVolunteers.findVolunteerCL({
    "cv.volunteer_id": volunteer_id
  }); // Get all training series

  return res.status(200).json({ volunteer, classes }); // Return an array of volunteer and training series
});

module.exports = router;
