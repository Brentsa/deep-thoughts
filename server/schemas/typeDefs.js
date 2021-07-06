//import the gql tagged template function
const {gql} = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        password: String
        thoughts: [Thought]
        friends: [User]
    }

    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        username: String
        createdAt: String
    }

    type Query {
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }

`;

//export the typeDefs
module.exports = typeDefs;