package dependency

import "github.com/go-redis/redis"

type redisResolver struct {
	conn *redis.Client
}

func (dr *redisResolver) MustResolveRedis() *redis.Client {
	if dr.conn != nil {
		return dr.conn
	}

	return redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
}
