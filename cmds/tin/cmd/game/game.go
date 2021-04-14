package game

import (
	"log"

	"github.com/spf13/cobra"

	"github.com/mon7792/card/services/game"
)

// GetCommand returns the game server command.
func GetCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "game",
		Short: "game server",
		Run: func(cmd *cobra.Command, args []string) {
			log.Println("Starting Game Server:5000")
			game.ServeGame()
		},
	}
}
