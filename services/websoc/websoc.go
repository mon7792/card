// package websoc is responsible for spinning dummy websocket service.
package websoc

import (
	"log"
	"net/http"

	webSoc "github.com/mon7792/card/pkg/websocket"
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

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		readWS(pool, w, r)
	})

	http.HandleFunc("/write", func(w http.ResponseWriter, r *http.Request) {
		clientID := "132412"
		writeWS(pool, w, r, clientID)
	})
}

func readWS(pool *webSoc.Pool, w http.ResponseWriter, r *http.Request) {
	ws, err := webSoc.UpGrader(w, r)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(err)
		return
	}

	client := &webSoc.Client{
		ID:   "132412", // TODO: this will be generated at random
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

func writeWS(pool *webSoc.Pool, w http.ResponseWriter, r *http.Request, clientID string) {

	clientConn := pool.Clients[clientID]
	if err := clientConn.Write(webSoc.Message{Type: 1, Body: "USER ! JOINED"}); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(err)
		return
	}
}

func StartWebSocServer() {
	setupWebSocketRoutes()
	if err := http.ListenAndServe(":5000", nil); err != nil {
		log.Fatal(err)
	}
}
