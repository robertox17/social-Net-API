// const User = require('../models/User');
const { User } = require("../models") 
module.exports = {
    getUsers(req,res){
        User.find()
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId })
        // .select('-__v')
        // .populate('friends')
        // .populate('thoughts')
        .then((user)=>
        !user
        ? res.status(404).json({message:'No user with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req,res){
        User.create(req.body)
        .then((user)=> res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: req.body,
          },
          {
            runValidators: true,
            new: true,
          }
        )
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(user);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user 
              ? res.status(404).json({ message: 'No user with this id!' })
              : User.findOneAndUpdate(
                  { users: req.params.userId },
                  { $pull: { users: req.params.userId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'user created but no user with this id!' })
              : res.json({ message: 'user successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },
      addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $addToSet: { friends: req.params.friendId } }, 
            { new: true })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(user);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, 
            { $pull: { friends: req.params.friendId } }, 
            { new: true })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(user);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
};