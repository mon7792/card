package game

import (
	"fmt"
	"github.com/spf13/cobra"
)

// GetCommand returns the game server command.
func GetCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "game",
		Short: "game server",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("GAME SERVER STARTED")
		},
	}
}
