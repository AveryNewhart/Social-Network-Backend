const { User } = require('../models/index');

module.exports = {
    getAllUsers(req, res) { // getting all users
        User.find()
        .then((thoughts) => {
            res.json(thoughts);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getOneUser(req, res) { // getting one user by its _id
        User.findOne({ _id: req.params.userId })
        .populate ({ path: 'thoughts', path: 'friends' })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "User with that Id was not found." });
            } else {
                res.json(user);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    createUser(req, res) { // creating a user
        User.create(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateUser(req, res) { // updating a user by its _id
        User.findOneAndUpdate(
            { _id: req.params._id },
            { username: req.body.username, email: req.body.email },
            { new: true}
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "User with that Id was not found." });
                } else {
                    console.log("User updated Successfully")
                    res.json(user);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteUser(req, res) { // deleting a user by its _id.
        User.findOneAndDelete({ _id: req.params._id })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "User with that Id was not found." });
                } else {
                    console.log("User deleted Successfully")
                    res.json(user);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addFriend(req, res) { // adding a friend, updating users friend list.
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "Sorry, the friend could not be added." });
                } else {
                    console.log("Friend added Successfully")
                    res.json(user);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
             });
    },
    deleteFriend(req, res) { // deleting a friend, updating users friend list.
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "Sorry, the friend could not be deleted." });
                } else {
                    console.log("Friend deleted Successfully")
                    res.json(user);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
             });
    }
};