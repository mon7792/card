// package game handles all the functionality related to the game core and helper mechanics.
package game

import "io"

type helper struct{}

// HelperFeatures exposes methods to support the core gaming mechanics.
type HelperFeatures interface{}

// NewHelper
func NewHelper() HelperFeatures {
	return &helper{}
}

// CreateGame will create new game and store it inside the cache.
func (h *helper) CreateGame(body io.ReadCloser) {
	// check the content

	// prepare the game session object

	// store the game session object

}
