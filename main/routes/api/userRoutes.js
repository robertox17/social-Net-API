const router = require('express').Router();
const { 
    createUser, 
    getUsers,
    getSingleUser, 
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').post(createUser).get(getUsers)

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;