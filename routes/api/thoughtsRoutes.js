const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtsController.js')

// /api/thoughts
// GET all thoughts
router.route('/').get(getAllThoughts);

// /api/thoughts/:thoughtId
// GET a single thought by its _id
router.route('/:thoughtId').get(getOneThought);

// /api/thoughts/createThought
// POST(create) a new thought
router.route('/createThought').post(createThought);


// /api/thoughts/updateThought/:_id
// PUT(update) a thought by its _id
router.route('/updateThought/:_id').put(updateThought);

// /api/thoughts/deleteThought/:_id
// DELETE(remove) thought by its _id
router.route('/deleteThought/:_id').delete(deleteThought);

// /api/thoughts/:thoughtId/createReaction
// PUT(create) a reaction for a thought
router.route('/:thoughtId/createReaction').put(createReaction);

// /api/thoughts/:thoughtId/deleteReaction
// DELETE(remove) a reaction from a thought
router.route('/:thoughtId/deleteReaction').delete(deleteReaction);

module.exports = router