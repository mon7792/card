package env

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMustGetEnvVal(t *testing.T) {
	// ARRANGE
	err := os.Setenv("DUMMY_KEY", "dummy-value")
	assert.NoError(t, err)

	cases := []struct {
		name   string
		envKey string
		envVal string
		isErr  bool
	}{
		{"env variable is set", "DUMMY_KEY", "dummy-value", false},
		{"env variable is not set", "DUMMY_NOT_SET_KEY", "", true},
	}

	for c := range cases {
		t.Run(cases[c].name, func(t *testing.T) {
			//	ACT
			envVal, err := MustGetEnvVal(cases[c].envKey)
			assert.Equal(t, cases[c].envVal, envVal)
			if cases[c].isErr {
				assert.Error(t, err)
				assert.Contains(t, err.Error(), errEnvDoesNotExist.Error())
			} else {
				assert.NoError(t, err)
			}

		})
	}
}
