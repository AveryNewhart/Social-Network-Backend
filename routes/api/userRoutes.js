const router = require('express').Router();

// referencing and requiring controllers
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController.js')


// /api/users
// GET all users
router.route('/').get(getAllUsers);

// /api/users/:userId
// GET a single user by its _id
router.route('/:userId').get(getOneUser);

// /api/users/createUser
// POST(create) a new user
router.route('/createUser').post(createUser);


// /api/users/updateUser/:_id
// PUT(update) a user by its _id
router.route('/updateUser/:_id').put(updateUser);

// /api/users/deleteUser/:_id
// DELETE(remove) user by its _id
router.route('/deleteUser/:_id').delete(deleteUser);

// /api/users/:userId/addFriends/:friendId
// Put to add friend to friends list
router.route('/:userId/addFriends/:friendId').put(addFriend);

// /api/user/:userId/deleteFriends/:friendId
// DELETE(remove) a friend from a user's friend list
router.route('/:userId/deleteFriends/:friendId').delete(deleteFriend);

// BONUS: Remove a user's associated thoughts when deleted.

module.exports = router