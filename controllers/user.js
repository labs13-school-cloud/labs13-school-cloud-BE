//Dependencies
const router = require("express").Router();

//Models
const Users = require("../models/db/users");

//GET - All users /api/users
router.route("/").get(async (req, res) => {
	/**
	 * Get all users associated with an authenticated user
	 *
	 * @function
	 * @param {Object} req - The Express request object
	 * @param {Object} res - The Express response object
	 * @returns {Object} - The Express response object
	 */

	const users = await Users.find();

	if (!users) {
		return res.status(404).json({
			message: "Unable to locate any users.",
		});
	}

	// Return all users to client
	res.status(200).json({ users });
});

//GET - All volunteers /api/users/volunteers
router.route("/volunteers").get(async (req, res) => {
	/**
	 * Get all users with role "volunteers"
	 *
	 * @function
	 * @param {Object} req - The Express request object
	 * @param {Object} res - The Express response object
	 * @returns {Object} - The Express response object
	 */

	const volunteers = await Users.find({
		"u.role": "volunteer",
	});

	if (!volunteers) {
		return res.status(404).json({
			message: "Unable to locate volunteers.",
		});
	}

	// Return all volunteers to client
	res.status(200).json({ volunteers });
});

//GET - All approved volunteers /api/users/volunteers/approved

router.route("/volunteers/approved").get(async (req, res) => {
	/**
	 * Get all users with role "volunteers" that are approved to mentor
	 *
	 * @function
	 * @param {Object} req - The Express request object
	 * @param {Object} res - The Express response object
	 * @returns {Object} - The Express response object
	 */

	const approvedVolunteers = await Users.find({ 
        "u.role": 'volunteer',
        "u.approved": true
     });

	// Return all approved volunteers to client
	res.status(200).json({ approvedVolunteers });
});

//GET - All pending volunteers /api/users/volunteers/pending

router.route("/volunteers/pending").get(async (req, res) => {
	/**
	 * Get all users with role "volunteers" but not approved
	 *
	 * @function
	 * @param {Object} req - The Express request object
	 * @param {Object} res - The Express response object
	 * @returns {Object} - The Express response object
	 */

        const pendingVolunteers = await Users.find({
            "u.role": 'volunteer',
            "u.approved": false
        });
        
		// Return all pending volunteers to client
		res.status(200).json({ pendingVolunteers });
});

//Get: All donator volunteers /api/users/volunteers/donator
router.route("/volunteers/donator").get(async (req, res) => {
	/**
	 * Get all users with role "volunteers" and are donators
	 *
	 * @function
	 * @param {Object} req - The Express request object
	 * @param {Object} res - The Express response object
	 * @returns {Object} - The Express response object
	 */

		const users = await Users.find({
            "u.role": 'volunteer',
            "u.donator": true
        });
        
		// Return all volunteer/donators to client
		res.status(200).json({ users });
});

//* If needed can add endpoint to get all donators not just donators that are volunteers

router.route("/:email").get(async (req, res) => {
    const { email } = req.params;
    
    const user = await Users.find({
        "u.email": email
    }).first();

    if (user.length <= 0) {
        return res.status(404).json({
            message: 'Could not find the user in the database'
        })
    }

    return res.status(200).json({
        user
    })
})

//Delete a user of particular id
router.route("/:id").delete(async (req, res) => {
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
			message: "The specified user does not exist.",
		});
	}

	// Return a message to the client to confirm that the user was deleted
	return res.status(200).json({
		message: "User account removed successfully.",
	});
});

module.exports = router;
