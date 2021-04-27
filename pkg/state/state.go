// package state represent game state
package state

import (
	"encoding/json"
)

// GameStateKey struct represent game state format.
type GameStateKey struct {
	Action   string `json:"action"`
	GameID   string `json:"game-id"`
	Message  string `json:"message"`
	PlayerID string `json:"player-id"`
}

// ACTION
const (
	GameActionEnter = "ENTER"
)

// action: "ENTER"
// game-id: "asdfsad"
// message: ""
// player-id: "asdfsad"

// EvaluateGameState docs
func EvaluateGameState(msg []byte) (*GameStateKey, error) {
	var gmeState GameStateKey
	if err := json.Unmarshal(msg, &gmeState); err != nil {
		return nil, err
	}
	return &gmeState, nil
}
