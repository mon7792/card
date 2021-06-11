package ui

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()

	// add the template.
	r.LoadHTMLGlob("templates/*")

	// Home Page
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "TIN",
		})
	})

	// create-game : display the page to create game and enter player name
	r.GET("/create-game", func(c *gin.Context) {
		c.HTML(http.StatusOK, "create-game.tmpl", nil)
	})

	// create-game : accept post request to create a game with a defined player name
	r.POST("/create-game", func(c *gin.Context) {
		// TODO: create a robust GAME ID logic
		// VERIFY gameID
		_ = fmt.Sprintf("%d", time.Now().Unix())

	})

	// join-game : display the page to player to join game
	r.GET("/join-game/:gameID", func(c *gin.Context) {
		gameID := c.Param("gameID")
		c.HTML(http.StatusOK, "join-game.tmpl", gin.H{
			"gameId": gameID,
		})
	})

	// game: the board for all player
	r.GET("/game/:gameID", func(c *gin.Context) {
		gameID := c.Param("gameID")
		c.HTML(http.StatusOK, "game.tmpl", gin.H{
			"gameId": gameID,
		})
	})

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
