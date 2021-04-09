package main

import (
	"log"

	"github.com/mon7792/card/cmds/tin/cmd"
)

func main() {
	if err := cmd.Execute(); err != nil {
		log.Fatalf("tin unable to start: error: %v", err)
	}
}
