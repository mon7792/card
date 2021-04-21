// package game docs.
package game

import (
	"log"
	"fmt"
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

func serveWs(w http.ResponseWriter, r *http.Request){
	ws, err := webSoc.Upgrader(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
		return
	}
	webSoc.Reader(ws, handleMessage)
}
func handleMessage(message []byte)error {
	result, err := DecodeMessage(message)
		if err != nil {
			log.Println("err:", err)
			return err
		}
		log.Println(result)
		return nil
}
// 2. create a websocket handler
// func echo(w http.ResponseWriter, r *http.Request) {
// 	//  upgrade the connection
// 	//  here conn refer the websocket connection

// 	conn, err := upgrader.Upgrade(w, r, nil)
// 	if err != nil {
// 		log.Println("err:", err)
// 		return
// 	}
// 	defer func() {
// 		if err := conn.Close(); err != nil {
// 			log.Println(err)
// 		}
// 	}()

// 	log.Printf("local address: %s  || remote address: %s \n", conn.LocalAddr(), conn.RemoteAddr())
// 	// read the message and write the message
// 	for {
// 		mt, message, err := conn.ReadMessage()
// 		if err != nil {
// 			log.Println("err:", err)
// 			break
// 		}
// 		log.Printf("recv: %s \n", string(message))
// 		result, err := DecodeMessage(message)
// 		if err != nil {
// 			log.Println("err:", err)
// 		}
// 		log.Printf("recv: %v \n", result)

// 		err = conn.WriteMessage(mt, message)
// 		if err != nil {
// 			log.Println("err:", err)
// 			break
// 		}
// 	}

// }
