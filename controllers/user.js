//Dependencies
const router = require("express").Router();

//Models
const Users = require("../models/db/users");
// const TeamMembers = require("../models/teamMember");
// const Notifications = require("../models/notifications");

// Retrieve all users
router.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "A network error occurred" });
  }
});

//GET - All volunteers /api/users/volunteers


//GET - All approved volunteers /api/users/volunteers/approved


//GET - All pending volunteers /api/users/volunteers/pending

//Get: All donator volunteers /api/users/volunteers/donator



// DELETE a user account
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await Users.findById(id);

//     if (!user) {
//       res.status(404).json({ message: "The specified user does not exist." });
//     } else {
//       await Users.deleteUser(id);
//       res.status(200).json({ message: "User account removed successfully." });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "A network error occurred." });
//   }
// });
// router.route("/api/users") 
//   .get(async (req, res) => {
//     /**
//      * Get all users associated with an authenticated user
//      *
//      * @function
//      * @param {Object} req - The Express request object
//      * @param {Object} res - The Express response object
//      * @returns {Object} - The Express response object
//      */

//   try {
//     const users = await db ("users").select("u.id AS id",
//     "u.name AS name",
//     "u.email AS email",
//     "u.stripe AS stripe",
//     "u.notifications_sent",
//     "a.account_type AS subscription",
//     "a.max_notification_count");
//     // Return all users to client
//     res.status(200).json({ users });
//   } catch(err) {
//     res.status(500).json({message: `Server error`, error:err});
//   } 
//   })

// router.route("/api/users/:id")
//   .delete(async (req, res) => {
//     /** 
//      * Deletes a specific User based on the ID parameter
//      * 
//      * @function
//      * @params {Object} req - the Express request object
//      * @params {Object} res - The Express response object
//      * @returns {Object} - The Express response object
//     */
//     const { id } = req.params;
//     const deleted = await Users.remove({ id });
    
//     // If "deleted" is falsey, the user we're trying to delete does not exist
//     if (!deleted) {
//       return res.status(404).json({ 
//         message: "The specified user does not exist." 
//       })
//     }
    
//     // Return a message to the client to confirm that the user was deleted
//     return res.status(200).json({ 
//       message: "User account removed successfully." 
//     });
//   });

  

module.exports = router;
