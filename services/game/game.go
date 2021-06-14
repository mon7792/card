// package game docs.
package game

import (
	"log"
	"net/http"
)

// ServeGame starts game backend.
func ServeGame() {

	if err := http.ListenAndServe(":5000", nil); err != nil {
		log.Fatal(err)
	}
}

func setupRoutes() {
	//  TODO: THIS WILL BE DIVIDED IN TO VARIOUS GAME INSTANCE.
	//  SETUP SINGLE POOL FOR EVERY CALL
	pool := webSoc.NewPool()
	go pool.Start()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if _, err := w.Write([]byte("welcome")); err != nil {
			log.Println(err)
		}
	})

	http.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func serveWs(pool *webSoc.Pool, w http.ResponseWriter, r *http.Request) {
	ws, err := webSoc.UpGrader(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
		return
	}

	client := &webSoc.Client{
		Conn: ws,
		Pool: pool,
	}
	// TODO: pool resgistration based on the game ID.
	pool.Register <- client
	client.Read()
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
