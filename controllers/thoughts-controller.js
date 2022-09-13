const { Thoughts, User } = require('../models');

const thoughtsController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
     .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // add thought
  addThought({ params, body }, res) {
    console.log(params);
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtsData => {
        console.log(dbThoughtsData);
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  // update thought
  updateThought({ params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators:true})
    .populate({path: 'reactions', select:'-_v'})
    .select('-_v')
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
  },

  // remove thought
  removeThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  // add reaction to thought
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
      
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtsController;
