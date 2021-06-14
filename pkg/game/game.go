package game

import (
	"fmt"
	"math/rand"
	"time"
)

// gameIDFormat
const (
	gameIDFormat = "%s-%s"
	letterBytes  = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
)

func init() {
	// seed for random game id generation.
	rand.Seed(time.Now().UTC().UnixNano())
}

// GenerateID generate random ID for game session.
// e.g. Tqe-rao, QBI-eCj
func GenerateID() string {
	b := make([]byte, 6)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return fmt.Sprintf(gameIDFormat, b[0:3], b[3:6])
}
