// 👇️ ts-nocheck disables type checking for entire file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import dotnev from 'dotenv'

dotnev.config()

const options = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password : process.env.REDIS_PASSWORD,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};

const pubSub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});

export default pubSub