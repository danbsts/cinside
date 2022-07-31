package main

import (
	"log"

	"github.com/streadway/amqp"
)

type Connection struct {
	Conn    *amqp.Connection
	Channel *amqp.Channel
	Queue   amqp.Queue
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func connect() *Connection {
	conn, err := amqp.Dial("amqp://rabbitmq:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")

	channel, err := conn.Channel()
	failOnError(err, "Failed to open a channel")

	args := make(amqp.Table)
	args["x-single-active-consume"] = true
	args["x-message-ttl"] = int64(86400000)
	queue, err := channel.QueueDeclare(
		"email",
		true,
		false,
		false,
		false,
		args,
	)
	failOnError(err, "Failed to declare a queue")
	return &Connection{
		Conn:    conn,
		Channel: channel,
		Queue:   queue,
	}
}

func closeConnection(connection *Connection) {
	connection.Conn.Close()
	connection.Channel.Close()
}

func main() {
	forever := make(chan bool)

	connection := connect()
	listenForEmails(connection)
	defer closeConnection(connection)

	log.Printf(" [*] Waiting for messages for: %s. To exit press CTRL+C", connection.Queue.Name)
	<-forever
}
