// Dependencies 
const router = require("express").Router();

// Models

const Classes = require("../models/db/classes");


// Routes

router
    .route("/")
    .get(async (req, res) => {
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
            res.status(500).json({ err: "This class could not be retrieved" })
        })
    })


router
    .route("/:id")
    .get(async (req, res) => {
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
            res.status(500).json({ err: "This class could not be retrieved" })
        })
    })
    
module.exports = router;