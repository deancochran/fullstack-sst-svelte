import Redis from 'ioredis';
import { Resource } from 'sst';
export const redis = new Redis({ port: Resource.MyRedis.port, host: Resource.MyRedis.host });
