package ui

import (
	"github.com/spf13/cobra"
	"log"

	"github.com/mon7792/card/services/ui"
)

// GetCommand returns the game server command.
func GetCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "ui",
		Short: "display the game ui",
		Run: func(cmd *cobra.Command, args []string) {
			log.Println("starting UI server: 3000")
			ui.ServeUI()
		},
	}
}
