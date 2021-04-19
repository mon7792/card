// package game docs.
package game

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
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
	http.HandleFunc("/echo", echo)

	if err := http.ListenAndServe(":5000", nil); err != nil {
		log.Fatal(err)
	}
}

// 2. create a websocket handler
func echo(w http.ResponseWriter, r *http.Request) {
	//  upgrade the connection
	//  here conn refer the websocket connection

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("err:", err)
		return
	}
	defer func() {
		if err := conn.Close(); err != nil {
			log.Println(err)
		}
	}()

	log.Printf("local address: %s  || remote address: %s \n", conn.LocalAddr(), conn.RemoteAddr())
	// read the message and write the message
	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("err:", err)
			break
		}
		log.Printf("recv: %s \n", string(message))
		result, err := DecodeMessage(message)
		if err != nil {
			log.Println("err:", err)
		}
		log.Printf("recv: %v \n", result)

		err = conn.WriteMessage(mt, message)
		if err != nil {
			log.Println("err:", err)
			break
		}
	}

}
