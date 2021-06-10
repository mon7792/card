// package websoc is responsible for spinning dummy websocket service.
package websoc

import (
	webSoc "github.com/mon7792/card/pkg/websocket"
	"log"
	"net/http"
)

// setupWebSocketRoutes handles the websop
func setupWebSocketRoutes() {
	pool := webSoc.NewPool()
	go pool.Start()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if _, err := w.Write([]byte("welcome")); err != nil {
			log.Println(err)
		}
	})

	http.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func serveWs(pool *webSoc.Pool, w http.ResponseWriter, r *http.Request) {
	ws, err := webSoc.UpGrader(w, r)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(err)
		return
	}

	client := &webSoc.Client{
		Conn: ws,
		Pool: pool,
	}
	pool.Register <- client
	if err := client.Read(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(err)
		return
	}
}
