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

// Message struct represent the format in which data is required.
type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

// Read the message send by each client and broadcast it to the pool.
//evaluateMessage func(message []byte) (*state.GameStateKey, error)
func (c *Client) Read() (err error) {
	defer func() {
		c.Pool.UnRegister <- c
		if errC := c.Conn.Close(); errC != nil && err == nil {
			errC = err
		}
	}()

	for {
		mt, msg, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return err
		}

		log.Println(mt, msg)

		//if mt == websocket.TextMessage {
		//
		//	// evaluate game state
		//	gameStateKey, err := evaluateMessage(msg)
		//	if err != nil {
		//		log.Println(err,gameStateKey)
		//		return
		//	}
		//
		//	// TODO: send the message to game server
		//}
	}

}

// AddClientEntry add the client entry in the redis
func (c *Client) AddClientEntry() {
	fmt.Println("CLIENT ADDED IN THE REDIS STORE.")
}

// write the message
func (c *Client) Write(msg Message) error {
	fmt.Println("WRITE TO")
	return c.Conn.WriteJSON(msg)
}
