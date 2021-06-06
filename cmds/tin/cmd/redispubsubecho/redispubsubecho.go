package redispubsubecho

import (
	"log"

	"github.com/spf13/cobra"

	"github.com/mon7792/card/services/redispubsubecho"
)

var redispubsubechoCmd = &cobra.Command{
	Use:   "redispubsubecho",
	Short: "redispubsubecho",
}

var pubCmd = &cobra.Command{
	Use:   "pub",
	Short: "redispubsubecho",
	Run: func(cmd *cobra.Command, args []string) {
		log.Println("redis pub")
		redispubsubecho.StartPubServer()
	},
}

var subCmd = &cobra.Command{
	Use:   "sub",
	Short: "redispubsubecho",
	Run: func(cmd *cobra.Command, args []string) {
		log.Println("redis sub")
		redispubsubecho.StartSubServer()
	},
}

// GetCommand returns the game server command.
func GetCommand() *cobra.Command {
	addSubCmd()
	return redispubsubechoCmd
}

func addSubCmd() {
	redispubsubechoCmd.AddCommand(pubCmd)
	redispubsubechoCmd.AddCommand(subCmd)
}
