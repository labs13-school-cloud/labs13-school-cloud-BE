// Dependencies
const router = require("express").Router();

// Models
const Users = require("../models/db/users");
const TrainingSeries = require("../models/db/trainingSeries");

// Routes
router.post("/", async (req, res) => {
  /**
   * Either Creates a new User or Logs In an Existing user
   *
   * @function
   * @param {Object} req - The Express request object
   * @param {Object} req.body - The request body, which represents a User object, provided by Auth0 via the client
   * @param {Object} res - The Express response object
   * @returns {Object} - The Express response object
   */

  // Destructure the Email and Name properties off of the request body
  const { email, given_name: first_name, family_name: last_name } = req.body;

  // Create a userInfo object from the request body
  const userInfo = { email, first_name, last_name };

  // If email is falsey, we can assume that the client/Auth0 did not provide an email
  if (!email) {
    res.status(400).json({ message: "Please include an email to login" });
  } else {
    // Find the user in our database based on the email provided by the client/Auth0
    const user = await Users.find({ "u.email": email }).first();
    if (!user && !first_name && !last_name) {
      // If both user and name don't exist, respond to the client with a message
      res.status(400).json({
        message: "Please include a name to create an account."
      });
    } else {
      // If user is not found, create a new User
      userInfo.role = "volunteer";
      const newUser = await Users.add(userInfo);

      // Respond to the client with a success message and the newly created User
      return res.status(201).json({
        message: "Account created Successfully",
        newUser
      });
    }
  }
});

module.exports = router;
