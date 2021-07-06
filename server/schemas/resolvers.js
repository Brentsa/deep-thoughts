const { User, Thought } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { findOneAndUpdate } = require("../models/User");

const resolvers = {
    Query: {
        thoughts: async (parent, {username}) => {
            const params = username ? {username} : {};
            return Thought.find(params).sort({createdAt: -1});
        },

        thought: async (parent, {_id}) => {
            return Thought.findById(_id);
        },

        users: async () => {
            return User.find().select('-__v -password').populate('thoughts').populate('friends');
        },

        user: async (parent, {username}) => {
            return User.findOne({username}).select('-__v -password').populate('thoughts').populate('friends');
        },
        me: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({_id: context.user._id}).select('-__v -password').populate('thoughts').populate('friends');
                return userData;
            }
            else{
                throw new AuthenticationError('Not logged in.');
            }
        }
    },
    Mutation:{
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },

        login: async(parent, args) =>{
            const user = await User.findOne({email: args.email});

            if(!user){
                throw new AuthenticationError('Incorrect Credentials');
            }

            const correctPw = await user.isCorrectPassword(args.password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect Credentials');
            }

            const token = signToken(user);
            return {token, user};
        },

        addThought: async(parent, args, context) => {
            if(context.user){
                const thought = await Thought.create({...args, username: context.user.username});

                await User.findByIdAndUpdate(context.user._id, {$push: {thoughts: thought._id}}, {new: true});

                return thought;
            }
            else{
                throw new AuthenticationError('You need to be logged in.')
            }
        },

        addReaction: async (parent, { thoughtId, reactionBody }, context) => {
            if (context.user) {
              const updatedThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $push: { reactions: { reactionBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
          
              return updatedThought;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;