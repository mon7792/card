package dependency

import (
	"github.com/go-redis/redis"
)

// MustResolveCache returns the connection to the cache
func (dr *depResolve) MustResolveCache() *redis.Client {
	dr.cache.Do(func() {
		//	TODO: get the address and password from environment variable.
		dr.cache.redis = redis.NewClient(&redis.Options{
			Addr:     "localhost:6379",
			Password: "",
			DB:       0,
		})
	})

	return dr.cache.redis
}
