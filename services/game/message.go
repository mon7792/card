// package game serves the game backend
package game

import "encoding/json"

type message struct {
	GameID   string `json:"game-id"`
	PlayerID string `json:"player-id"`
	Action   string `json:"action"`
	Message  string `json:"message"`
}

// DecodeMessage unmarshal the message and check if they are in proper format.
func DecodeMessage(data []byte) (*message, error) {
	var msg *message

	if err := json.Unmarshal(data, &msg); err != nil {
		return nil, err
	}
	return msg, nil
}
