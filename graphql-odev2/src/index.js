import { createServer, createPubSub, pipe, filter } from '@graphql-yoga/node'
import data from './data.js'
import Models from './models/index.js'
import userController from './controllers/userController.js'
import postController from './controllers/postController.js'
import commentController from './controllers/commentController.js'
import pubSub from './redisSubscription.js'
import dotnev from 'dotenv'

dotnev.config()

const typeDefs = `
    ${Models.User}
    ${Models.Post}
    ${Models.Comment}

    type Query {
        ${userController.queryType}
        ${postController.queryType}
        ${commentController.queryType}
        
    }

    type Mutation {
        ${userController.mutationType}
        ${postController.mutationType}
        ${commentController.mutationType}
    }


    type Subscription{
        userCreated : User!
        userCount : Int!
        watchUserDetailChanged(id : ID!) : User
    }

    ${commentController.inputTypes}
    ${postController.inputTypes}
    ${userController.inputTypes}

`

const resolvers = {
    User : userController.resolver(data),
    Post : postController.resolver(data),
    Comment : commentController.resolver(data),
    Query : {
        ...userController.queryResolver(data),
        ...postController.queryResolver(data),
        ...commentController.queryResolver(data),
        
    },
    Mutation : {
        ...userController.mutationResolver(data),
        ...postController.mutationResolver(data),
        ...commentController.mutationResolver(data),
        
    },
    Subscription : {
        userCreated: {
            subscribe : (_,args,context) => context.pubSub.asyncIterator('userCreated'),
            resolve : (payload) => payload 
        },
        userCount : {
            subscribe : (_,args,context) => context.pubSub.asyncIterator('userCount'),
            resolve : (payload) => payload,
        },
        watchUserDetailChanged : {
            subscribe : (_,args,context) => pipe(
                context.pubSub.asyncIterator('watchUserDetailChanged'),
                filter((value) => {console.log(value);return value.id == args.id}),
            ),
            resolve : (value) => value

        }
    }

}

const server = createServer({
    context : {pubSub},
    schema : {
        typeDefs, 
        resolvers,
    }
})

server.start()
