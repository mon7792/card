package game

// createGameReq represent struct to read user name in the game flow.
type createGameReq struct {
	PlayerName string `json:"playerName"`
}

// createGameResp represent struct to send game-ID to the user.
type createGameResp struct {
	GameID string `json:"gameId"`
}
