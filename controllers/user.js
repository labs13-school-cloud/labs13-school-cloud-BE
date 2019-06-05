//Dependencies
const router = require("express").Router();

//Models
const Users = require("../models/db/users");

router.route("/:id")
  .delete(async (req, res) => {
    /** 
     * Deletes a specific User based on the ID parameter
     * 
     * @function
     * @params {Object} req - the Express request object
     * @params {Object} res - The Express response object
     * @returns {Object} - The Express response object
    */
    const { id } = req.params;
    const deleted = await Users.remove({ id });
    
    // If "deleted" is falsey, the user we're trying to delete does not exist
    if (!deleted) {
      return res.status(404).json({ 
        message: "The specified user does not exist." 
      })
    }
    
    // Return a message to the client to confirm that the user was deleted
    return res.status(200).json({ 
      message: "User account removed successfully." 
    });
  });

  router.route("/")
  .get(async (req, res) => {
    /**
     * Get all users associated with an authenticated user
     *
     * @function
     * @param {Object} req - The Express request object
     * @param {Object} res - The Express response object
     * @returns {Object} - The Express response object
     */
    const users = await db ("users").select("u.id AS id",
    "u.name AS name",
    "u.email AS email",
    "u.stripe AS stripe",
    "u.notifications_sent",
    "a.account_type AS subscription",
    "a.max_notification_count");
    // Return all users to client
    return res.status(200).json({ users });
  })

module.exports = router;
