package main

import (
	"fmt"
	"os"

	gomail "gopkg.in/gomail.v2"
)

func getEmailSubject(emailType string) (string, error) {
	switch emailType {
	case "JOIN_REQUEST":
		return "Hey, you've got new join requests!", nil
	default:
		return "", fmt.Errorf("error for: %s", emailType)
	}
}

func sendEmail(receiver string, emailType string, body string) error {
	subject, err := getEmailSubject(emailType)
	failOnError(err, "Couldn't find subject")

	msg := gomail.NewMessage()
	msg.SetHeader("From", "Cinside Team <cinside@cin.ufpe.br>")
	msg.SetHeader("To", receiver)
	msg.SetHeader("Subject", subject)
	msg.SetBody("text/html", body)

	password := os.Getenv("EMAIL_PASSWORD")
	n := gomail.NewDialer("smtp.gmail.com", 587, "cinside@cin.ufpe.br", password)

	// Send the email
	return n.DialAndSend(msg)
}
