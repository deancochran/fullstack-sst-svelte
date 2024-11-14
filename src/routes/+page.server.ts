import { Cluster } from "ioredis";
import { Resource } from "sst";
import type { PageServerLoad } from "./$types";

const redis = new Cluster(
    [{ host: Resource.MyRedis.host, port: Resource.MyRedis.port }],
    {
      dnsLookup: (address, callback) => callback(null, address),
      redisOptions: {
        tls: {},
        username: Resource.MyRedis.username,
        password: Resource.MyRedis.password,
      },
    }
  );

export const load: PageServerLoad = async () => {
    const counter = await redis.incr("counter");

    return { counter };
};