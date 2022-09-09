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

func sendEmail(request *EmailRequest) {
	body := getEmailBody(request.Type, request.Contributors, request.Project)
	subject, err := getEmailSubject(request.Type)
	failOnError(err, "Couldn't find subject")

	msg := gomail.NewMessage()
	msg.SetHeader("From", "Cinside Team <cinside@cin.ufpe.br>")
	msg.SetHeader("To", request.Receiver)
	msg.SetHeader("Subject", subject)
	msg.SetBody("text/html", body)

	password := os.Getenv("EMAIL_PASSWORD")
	n := gomail.NewDialer("smtp.gmail.com", 587, "cinside@cin.ufpe.br", password)

	// Send the email
	if err := n.DialAndSend(msg); err != nil {
		panic(err)
	}
}
