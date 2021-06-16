package web

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type handler struct{}

// indexHandler handler for index path.
func (h *handler) indexHandler() func(c *gin.Context) {

	return func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", nil)
	}
}

// getCreateGameHandler handler for create game page
func (h *handler) getCreateGameHandler() func(c *gin.Context) {

	return func(c *gin.Context) {
		c.HTML(http.StatusOK, "create-game.tmpl", nil)
	}
}

// postCreateGameHandler handler for create game post request
func (h *handler) postCreateGameHandler() func(c *gin.Context) {

	return func(c *gin.Context) {
		// TODO: create a robust GAME ID logic
		// VERIFY gameID
	}
}
