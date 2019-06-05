// Dependencies 
const router = require("express").Router();

// Models

const Classes = require("../models/db/classes");

// Data Validation

const { classesSchema } = require("../models/schemas");
const validation = require("../middleware/dataValidation");

// Routes

router
    .route("/")
    .get(async (req, res) => {
        /**
         * Get all Classes associated with an authenticated user
         * 
         * @function
         * 
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * 
         * @returns {Object} - Express response object
         */
        // Destructure the authenticated User email from res.locals
        const { email } = res.locals.user;

        // Get all Classes from the database that are associated with the authenticated user
        const classes = await Classes.find({ "u.email": email });

        //Return the Classes found to the user
        res.status(200).json({ classes })
    })

module.exports = router;