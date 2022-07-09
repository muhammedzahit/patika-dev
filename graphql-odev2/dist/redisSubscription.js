// 👇️ ts-nocheck disables type checking for entire file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
const options = {
    host: "redis-16740.c135.eu-central-1-1.ec2.cloud.redislabs.com",
    port: 16740,
    password: "yivoljGLWWBFAc3GlcCFN0G2J91sAp7H",
    retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};
const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
});
export default pubSub;
//# sourceMappingURL=redisSubscription.js.map