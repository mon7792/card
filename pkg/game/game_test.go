package game

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGenerateID(t *testing.T) {
	gameID := GenerateID()
	assert.Equal(t, len(gameID), 7)
	t.Log(gameID)
}
