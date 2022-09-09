const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,  
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughts-controller');

// gets all thoughts
// /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// gets/puts/deletes thought by id
// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// creates thought with user id
// /api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought);

// puts reactions to thought
// /api/comments/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .put(addReaction)

// /api/comments/<pizzaId>/<commentId>/<replyId>
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
