// package websocket
package websocket

import "fmt"

// GamePool docs.
type GamePool struct {
	Game map[string]*Pool
}

// Pool contain all the channel needed for the concurrent connection within a single game.
type Pool struct {
	Register   chan *Client
	UnRegister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

// NewPool create a new pool for client connection within a single game.
func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		UnRegister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

//  Starts pool for the single game instance.
func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of the Connection Pool:", len(pool.Clients))
			// TODO: send the message to redis channel
			// add the redis channel
			for clt := range pool.Clients {
				fmt.Println(clt)
				clt.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."})
			}
			break
		case client := <-pool.UnRegister:
			delete(pool.Clients, client)
			fmt.Println("Size of the Connection Pool:", len(pool.Clients))
			// TODO: send the message to redis channel
			// remove the redis channel
			for clt := range pool.Clients {
				fmt.Println(clt)
				clt.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected.."})
			}
			break
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all the clients within the pool")
			// TODO: send the message to redis channel
			for clt := range pool.Clients {
				fmt.Println(clt)
				if err := clt.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}
