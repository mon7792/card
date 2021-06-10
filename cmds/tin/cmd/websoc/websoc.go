package websoc

import (
	"log"

	"github.com/spf13/cobra"

	"github.com/mon7792/card/services/websoc"
)

// GetCommand returns the game server command.
func GetCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "websoc",
		Short: "websoc server",
		Run: func(cmd *cobra.Command, args []string) {
			log.Println("Starting Web SOC Server:5000")
			websoc.StartWebSocServer()
		},
	}
}
