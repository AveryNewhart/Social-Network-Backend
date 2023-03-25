const { User, Thoughts, Reactions } = require("../models/index");

module.exports = {
    getAllThoughts(req, res) { // getting all thoughts
        Thoughts.find()
        .then((thoughts) => {
            console.log("All thoughts retrieved successfully.")
            res.json(thoughts);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getOneThought(req, res) { // getting one thought by its _id
        Thoughts.findOne({ _id: req.params.thoughtId })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "Thought with that Id was not found." });
            } else {
                console.log("Individual thought retrieved successfully.")
                res.json(thought);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    createThought(req, res) { // creating a thought, and finding a user to add attach the thought to the specific user.
        Thoughts.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "Thought NOT created" });
            } else {
                res.json("Thought Created");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateThought(req, res) { // updating a thought by its _id
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughtText: req.body.thoughtText, username: req.body.username },
            { new: true}
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: "Thought with that Id was not found." });
                } else {
                    console.log("Thought updated Successfully")
                    res.json(thought);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) { // deleting a thought by its _id
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: "Thought with that Id was not found." });
                } else {
                    console.log("Thought deleted Successfully")
                    res.json(thought);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createReaction(req, res) { // creating a reaction for a thought
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true}
        )
            .then((thought) => {
                console.log(req.params.thoughtId)
                if (!thought) {
                    console.log("Reaction could not be created");
                } else {
                    console.log("Reaction created Successfully");
                    res.json(thought);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteReaction(req, res) { // deleting a reaction from a thought
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.query.reactionId } } }
        )
        .then((thought) => {
            if (!thought) {
                console.log("Reaction could not be deleted");
            } else {
                console.log("Reaction deleted Successfully");
                res.json(thought);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};