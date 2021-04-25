// package websocket
package websocket

import (
	"log"

	"net/http"

	"github.com/gorilla/websocket"
)

// TODO: Work on this
//https://tutorialedge.net/projects/chat-system-in-go-and-react/part-4-handling-multiple-clients/

// upGrader docs.
var upGrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	}}

// Upgrader docs
func Upgrader(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	ws, err := upGrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return ws, err
	}

	return ws, nil
}

// Reader docs
func Reader(conn *websocket.Conn, handleMessage func(message []byte) error) {
	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		log.Println("message:", string(message))
		if err := handleMessage(message); err != nil {
			log.Println(err)
			return
		}

		if err := conn.WriteMessage(mt, message); err != nil {
			log.Println(err)
			return
		}
	}
}
