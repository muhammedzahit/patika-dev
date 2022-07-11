import {gql} from 'apollo-server'

export const postType = gql`
    type Post{

        id : ID!
        title : String
        user_id : ID!
        comments : [Comment]
        user : User
    }
`

export const postResolver = (data) => {
    return {
        comments : (parent, args) => data.comments.filter(c => c.post_id == parent.id),
        user : (parent,args) => data.users.find(u => u.id == parent.user_id)
    }
}