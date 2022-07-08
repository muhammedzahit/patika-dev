import {ApolloServer, gql} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'

import data from './data.js'
import {userType, userResolver} from './models/User.js'
import {postType, postResolver} from './models/Post.js'
import {commentType, commentResolver} from './models/Comment.js'

const typeDefs = gql`
    ${userType}
    ${postType}
    ${commentType}

    type Query {
        users : [User],
        user(id : ID!) : User,
        posts : [Post],
        post(id : ID!) : [Post],
        comments : [Comment],
        comment(id : ID!) : Comment,
    }
`

const resolvers = {
    User : userResolver(data),
    Post : postResolver(data),
    Comment : commentResolver(data),
    Query : {
        users : () => data.users,
        user : (parent,args) => data.users.find(u => u.id == args.id),
        posts : () => data.posts,
        post : (parent,args) => data.posts.find(p => p.id == args.id),
        comments : () => data.comments,
        comment : (parent,args) => data.comments.find(c => c.id == args.id)
    }
}

const server = new ApolloServer({typeDefs, 
    resolvers,
    plugins : [ApolloServerPluginLandingPageGraphQLPlayground({})]}
)

server.listen().then( (a) => {
    console.log('server url : ' + a.url)
})
