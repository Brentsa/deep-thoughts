//import the gql tagged template function
const {gql} = require('apollo-server-express');

//create our typeDefs
const typeDefs = gql`

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
        thoughts(username: String): [Thought]
    }

`;

//export the typeDefs
module.exports = typeDefs;