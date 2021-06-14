package ui

import "log"

// ServeUI serves game ui.
func ServeUI() {
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	if err := r.Run(":8080"); err != nil {
		log.Panic(err)
	}
}
