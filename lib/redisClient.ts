import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var redisClient: Redis | undefined;
}

// one shared redis connection. has to be the same redis the backend talks to,
// or it won't find our session keys and everyone gets logged straight back out.
export function getRedisClient() {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL is missing");
  }

  if (!redisUrl.startsWith("redis://") && !redisUrl.startsWith("rediss://")) {
    throw new Error(
      `Invalid REDIS_URL. Use redis:// or rediss://. Current value: ${redisUrl}`,
    );
  }

  if (!global.redisClient) {
    global.redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: true,
    });

    global.redisClient.on("connect", () => {
      console.log("Redis connected");
    });

    global.redisClient.on("error", (error) => {
      console.error("Redis error:", error.message);
    });
  }

  return global.redisClient;
}
