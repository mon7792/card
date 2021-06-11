// package game docs.
package game

import (
	"log"
	"net/http"
)

// ServeGame starts game backend.
func ServeGame() {

	if err := http.ListenAndServe(":5000", nil); err != nil {
		log.Fatal(err)
	}
}
