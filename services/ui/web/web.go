package web

import (
	"github.com/gin-gonic/gin"
)

type ui struct {
	engine *gin.Engine
	port   string
}

// UIInterface exposes the wrapped gin methods
type UIInterface interface{}

// NewUI exposes the
func NewUI(templateFolderPath, port string) UIInterface {
	engine := gin.Default()
	engine.LoadHTMLGlob(templateFolderPath)
	return &ui{
		engine: engine,
		port:   port,
	}
}

// Setup register endpoints and the handlers.
func (u *ui) Setup() {}

func (u *ui) ListenAndServe() error {
	return u.engine.Run(u.port)
}
