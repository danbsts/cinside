package main

import (
	"encoding/json"
	"log"
	"os"
)

type Contributor struct {
	DisplayName string
	Email       string
	Linkedin    string
	Github      string
	Skills      string
}

type EmailRequest struct {
	Receiver     string
	Type         string
	Project      string
	Contributors []Contributor
}

func listenForEmails(connection *Connection) {
	prodEnv := os.Getenv("PRD_ENV")
	if prodEnv == "" {
		log.Printf("Not on production or testing env")
		return
	}
	log.Printf("Starting")
	channel := connection.Channel
	queue := connection.Queue
	msgs, err := channel.Consume(
		queue.Name, // queue
		"test-go",  // consumer
		false,      // auto-ack
		false,      // exclusive
		false,      // no-local
		false,      // no-wait
		nil,        // args
	)
	failOnError(err, "Failed to register a consumer")

	go func() {
		for d := range msgs {
			sendRequest := &EmailRequest{}
			err := json.Unmarshal(d.Body, sendRequest)
			failOnError(err, "Error decoding JSON: %s")

			log.Printf("Sending email to: %s\n", sendRequest.Receiver)
			body := getEmailBody(sendRequest.Type, sendRequest.Contributors, sendRequest.Project)
			if err := sendEmail(sendRequest.Receiver, sendRequest.Type, body); err != nil {
				channel.Nack(d.DeliveryTag, false, true)
				log.Printf("%s Failed to send email\n", d.Timestamp)
			} else {
				channel.Ack(d.DeliveryTag, false)
				log.Printf("Email sent!\n")
			}
		}
	}()

}
