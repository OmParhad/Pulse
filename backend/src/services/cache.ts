type CacheItem = {
  data: any;
  timestamp: number;
};

const cache = new Map<string, CacheItem>();

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export function getCache(key: string) {
  const item = cache.get(key);

  if (!item) return null;

  const expired = Date.now() - item.timestamp > CACHE_DURATION;

  if (expired) {
    cache.delete(key);
    return null;
  }

  return item.data;
}

export function setCache(key: string, data: any) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache() {
  cache.clear();
}