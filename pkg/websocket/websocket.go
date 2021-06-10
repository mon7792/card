// package websocket
package websocket

import (
	"net/http"

	"github.com/gorilla/websocket"
)

// upGrader docs.
var upGrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	}}

// UpGrader docs
func UpGrader(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	ws, err := upGrader.Upgrade(w, r, nil)
	if err != nil {
		return ws, err
	}

	return ws, nil
}
