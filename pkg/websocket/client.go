package websocket

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
	"github.com/mon7792/card/pkg/state"
)

// Client connecting to the websocket server.
type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
	Game *GamePool
}

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

// Read the message send by each client and broadcast it to the pool.
func (c *Client) Read(evaluateMessage func(message []byte) (*state.GameStateKey, error)) {
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

		// evaluate game state
		gameStateKey, err := evaluateMessage(msg)
		if err != nil {
			log.Println(err)
			return
		}

		// Game State
		if gameStateKey.Action == state.GameActionEnter {
			c.Game.Game[gameStateKey.GameID] = c.Pool
		} else {
			//  TODO:
		}
		message := Message{Type: mt, Body: string(msg)}
		// TODO : DECIDE THE MESSAGE TYPE

		c.Pool.Broadcast <- message
		fmt.Printf("Message received: %+v\n", message)
	}

}
