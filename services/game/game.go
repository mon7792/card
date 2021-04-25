// package game docs.
package game

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"

	webSoc "github.com/mon7792/card/pkg/websocket"
)

// upgrader specify the parameter to upgrade from http_connection to websocket connection
var upgrader = websocket.Upgrader{}

func init() {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}
}

// ServeGame starts game backend.
func ServeGame() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if _, err := w.Write([]byte("welcome")); err != nil {
			log.Println(err)
		}
	})
	//  serve the websocket connection
	http.HandleFunc("/echo", serveWs)

	if err := http.ListenAndServe(":5000", nil); err != nil {
		log.Fatal(err)
	}
}

func serveWs(w http.ResponseWriter, r *http.Request) {
	ws, err := webSoc.Upgrader(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
		return
	}
	webSoc.Reader(ws, handleMessage)
}

func handleMessage(message []byte) error {
	// TODO:
	// decode the message. If invalid format. send the message in the correct format
	// store the message.
	// send the feedback on the basis of the above action.
	result, err := DecodeMessage(message)
	if err != nil {
		log.Println("err:", err)
		return err
	}
	// store the message.
	log.Println(result)
	return nil
}
