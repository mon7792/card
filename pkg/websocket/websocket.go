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
