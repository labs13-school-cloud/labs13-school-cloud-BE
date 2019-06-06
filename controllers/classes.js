// Dependencies 
const router = require("express").Router();

// Models

const Classes = require("../models/db/classes");

// Data validation

const validation = require("../middleware/dataValidation");

// Routes

router
    .route("/")
    .get((req, res) => {
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
    .get((req, res) => {
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

router 
    .route("/")
    .post(async (req, res) => {
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
        const { class_name, grade_level, subject, number_of_students, volunteer_id } = req.body;

        // Add the new class  to the database
        const newClass = await Classes.add({ class_name, grade_level, subject, number_of_students, volunteer_id });

        // Return the newly created classs to the user
        return res.status(201).json({ newClass });
    })

router
    .route("/:id")
    .put(async (req, res) => {
        /**
         * Update the specified training series in the database
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
        const updatedClass = await Classes.update(
            { "c.id": id },
            req.body
        );
        
        // If the class they're looking for isn't found, return a 404 and message.
        if (!updatedClass) {
            return res.status(404).json({
                message: "Sorry, we couldn't find that class!"
            });
        };

        // Return the updated training series to the client
        return res.status(200).json({ message: "This class has been successfully updated!" });
    })

module.exports = router;