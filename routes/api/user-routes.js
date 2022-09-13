const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

// /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/user/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:id/friends')
  

router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
