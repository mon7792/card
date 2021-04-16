#!/usr/bin/env bash
echo "Tin running ..."
# TODO work on the script to run the entire application.
go run cmds/tin/main.go game &
go run cmds/tin/main.go ui &