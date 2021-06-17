package dependency

import (
	"sync"

	"github.com/go-redis/redis"
)

// DepResolver abstract the dependency resolution.
type DepResolver interface {
	MustResolveCache() *redis.Client
}

// depResolve provide access to pre-configured runtime dependencies.
type depResolve struct {
	cache struct {
		sync.Once
		redis *redis.Client
	}
}

// NewDepResolver returns the new dependency resolver instance
func NewDepResolver() DepResolver {
	return &depResolve{}
}
