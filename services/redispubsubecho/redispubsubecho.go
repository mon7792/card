package redispubsubecho

import (
	"fmt"

	"github.com/go-redis/redis"
)

// StartPubServer starts redis connection.
func StartPubServer() {
	fmt.Println("Go Redis CONNECTING")
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	// send ping
	pong, err := client.Ping().Result()
	fmt.Println(pong, err)

	// publish to channel
	err = client.Publish("user", "hi").Err()
	fmt.Println(err)

	err = client.Close()
	fmt.Println(err)
}

// StartSubServer starts redis connection.
func StartSubServer() {
	fmt.Println("Go Redis CONNECTING")
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	// send ping
	pong, err := client.Ping().Result()
	fmt.Println(pong, err)

	// SUB to channel
	topic := client.Subscribe("user")
	channel := topic.Channel()

	for m := range channel {
		fmt.Println(m)
	}

	err = client.Close()
	fmt.Println(err)
}
