package ui

import (
	"log"
	"net/http"
)

// ServeUI serves game ui.
func ServeUI() {
	fs := http.FileServer(http.Dir("./ui"))
	http.Handle("/", fs)

	log.Println("Listening on :3000...")
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal(err)
	}
}
