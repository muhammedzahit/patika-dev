const {createServer} = require('@graphql-yoga/node')
import {loadFiles} from '@graphql-tools/load-files'
import db from './data'
const pubSub = require('./redisSubscription')

async function main(){
    const types = await loadFiles('src/types/**/*.graphql')
    const resolvers = await loadFiles('src/resolvers/**/*.{js,ts}')

    const server = createServer({
        context : {pubSub, db},
        schema : {
            typeDefs: types,
            resolvers: resolvers
    }
    })
    
    server.start()
}

main()
