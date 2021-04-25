package websocket

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

// Client connecting to the websocket server.
type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
}

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

// Read the message send by each client and broadcast it to the pool.
func (c *Client) Read() {
	defer func() {
		c.Pool.UnRegister <- c
		c.Conn.Close()
	}()

	for {
		mt, msg, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		message := Message{Type: mt, Body: string(msg)}
		c.Pool.Broadcast <- message
		fmt.Printf("Message received: %+v\n", message)
	}

}
