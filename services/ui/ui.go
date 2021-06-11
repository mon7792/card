package ui

import (
	"log"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	return r
}

// ServeUI serves game ui.
func ServeUI() {
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	if err := r.Run(":8080"); err != nil {
		log.Panic(err)
	}
}

// CODE TO SERVE FILE FROM THE STATIC FOLDER.
//fs := http.FileServer(http.Dir("./ui"))
//http.Handle("/", fs)
//
//log.Println("Listening on :3000...")
//if err := http.ListenAndServe(":3000", nil); err != nil {
//	log.Fatal(err)
//}
