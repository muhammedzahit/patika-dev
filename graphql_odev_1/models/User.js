import {gql} from 'apollo-server'

export const userType = gql`
    type User{

    id : ID!
    fullName : String
    posts : [Post]
    }
`

export const userResolver = (data) => {
    return {
        posts : (parent,args) => data.posts.filter(p => p.user_id == parent.id)
    }
}