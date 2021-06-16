package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// StartAPI starts the api server.
func StartAPI() {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})
	http.ListenAndServe(":3000", r)
}
