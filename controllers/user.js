//Dependencies
const router = require("express").Router();

//Models
const Users = require("../models/db/users");
// const TeamMembers = require("../models/teamMember");
// const Notifications = require("../models/notifications");


//GET - All pending volunteers /api/users/volunteers/pending

//Get: All donator volunteers /api/users/volunteers/donator



//GET - All users /api/users
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

  try {
    const users = await Users.find() 
    // Return all users to client
    res.status(200).json({ users });
  } catch(err) {
    res.status(500).json({message: `Server error`, error:err});
  } 
  })



  //GET - All volunteers /api/users/volunteers
  router.route("/volunteers") 
  .get(async (req, res) => {
    /**
     * Get all users with role "volunteers"
     *
     * @function
     * @param {Object} req - The Express request object
     * @param {Object} res - The Express response object
     * @returns {Object} - The Express response object
     */

  try {
    const users = await Users
    .find()
    // .select('volunteer.name as Volunteer')
    .where({'role': 'volunteers'}) 
    // Return all volunteers to client
    res.status(200).json({ users });
  } catch(err) {
    res.status(500).json({message: `Server error`, error:err});
  } 
  })

//GET - All approved volunteers /api/users/volunteers/approved

router.route("/api/users/volunteers/approved") 
  .get(async (req, res) => {
    /**
     * Get all users with role "volunteers"
     *
     * @function
     * @param {Object} req - The Express request object
     * @param {Object} res - The Express response object
     * @returns {Object} - The Express response object
     */

  try {
    const users = await Users
    .find()
    // .select('volunteer.name as Volunteer')
    .where('approved', 'true') 
    // Return all volunteers to client
    res.status(200).json({ users });
  } catch(err) {
    res.status(500).json({message: `Server error`, error:err});
  } 
  })


  router.route("/api/users") 
  .get(async (req, res) => {
    /**
     * Get all users 
     *
     * @function
     * @param {Object} req - The Express request object
     * @param {Object} res - The Express response object
     * @returns {Object} - The Express response object
     */

  try {
    const users = await Users.find()
    .where 
    // Return all users to client
    res.status(200).json({ users });
  } catch(err) {
    res.status(500).json({message: `Server error`, error:err});
  } 
  })

  //Get: All donator volunteers /api/users/volunteers/donator

 //Delete a user of particular id 
router.route("/api/users/:id")
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









  

module.exports = router;
