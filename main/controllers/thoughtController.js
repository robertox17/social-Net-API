const { Thought, User } = require('../models');


const thoughtController = {
    getThoughts(req,res){
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) =>
        !thought
        ?res.status(404).json({messege:'No Thought with that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThoughts(req,res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                {username: req.body.username },
                // {$addToSet:{thoughts: thought._id}},
                { $push: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then((user)=>
        !user
        ? res.status(404).json({
            message:'Thought created , but found no user with that ID',
        })
        : res.json('Created Thought🎉')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    updateThoughts(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    deleteThoughts(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought 
              ? res.status(404).json({ message: 'No thought with this id!' })
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'Thought deleted but no user with this id!' })
              : res.json({ message: 'Thought successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },


addReactions(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

deleteReactions(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((video) =>
        !video
          ? res.status(404).json({ message: 'no thought with this ID' })
          : res.json(video)
      )
      .catch((err) => res.status(500).json(err));
  },
}
module.exports = thoughtController;
