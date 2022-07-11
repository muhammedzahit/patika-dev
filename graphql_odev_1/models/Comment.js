import {gql} from 'apollo-server'

export const commentType = gql`
    type Comment{
        id : ID!
        text : String
        post : Post
        post_id : ID
    }
`

export const commentResolver = (data) => {
    return {
        post : (parent,args) => data.posts.find(p => p.id == parent.post_id)
    }
}