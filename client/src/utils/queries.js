import {gql} from '@apollo/client';

export const QUERY_THOUGHTS = gql`
    query thoughts($username: String){
        thoughts(username: $username){
            _id
            username
            thoughtText
            createdAt
            reactionCount
            reactions{
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;