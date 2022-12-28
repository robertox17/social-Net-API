const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReactions,
  deleteReactions,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThoughts);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReactions);

// /api/thought/::thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactions);

module.exports = router;
 