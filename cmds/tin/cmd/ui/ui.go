package ui

import (
	"fmt"
	"github.com/spf13/cobra"
)

// GetCommand returns the game server command.
func GetCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "ui",
		Short: "display the game ui",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Game UI render service started")
		},
	}
}
