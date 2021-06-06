package cmd

import (
	"github.com/spf13/cobra"

	"github.com/mon7792/card/cmds/tin/cmd/game"
	"github.com/mon7792/card/cmds/tin/cmd/redispubsubecho"
	"github.com/mon7792/card/cmds/tin/cmd/ui"
)

var rootCmd *cobra.Command

// Execute run the tin application
func Execute() error {
	return rootCmd.Execute()
}

func init() {
	rootCmd = &cobra.Command{
		Use:   "tin",
		Short: "Tin is a multi-player card game"}

	addSubCommand()
}

func addSubCommand() {
	rootCmd.AddCommand(game.GetCommand())
	rootCmd.AddCommand(ui.GetCommand())
	rootCmd.AddCommand(redispubsubecho.GetCommand())
}
