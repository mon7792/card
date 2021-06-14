package api

import (
	"log"

	"github.com/spf13/cobra"
)

// GetCommand returns the game server command.
func GetCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "api",
		Short: "api server",
		Run: func(cmd *cobra.Command, args []string) {
			log.Println("Starting api server")
		},
	}
}
