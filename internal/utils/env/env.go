// package env is responsible for environment variable manipulation.
package env

import (
	"errors"
	"fmt"
	"os"
	"strings"
)

// errEnvDoesNotExist var for env not set
var errEnvDoesNotExist = errors.New("environment value not set")

// MustGetEnvVal returns environment variable value if set, else returns error.
func MustGetEnvVal(key string) (string, error) {
	envVal := strings.TrimSpace(os.Getenv(key))
	if envVal != "" {
		return envVal, nil
	}
	return "", fmt.Errorf("%w: for %s", errEnvDoesNotExist, key)
}
