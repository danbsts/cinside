package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

func getContributorBoxes(contributors []Contributor) string {
	parsedContributors := make([]string, len(contributors))
	contributorBox, err := ioutil.ReadFile("templates/CONTRIBUTOR_BOX.html")
	failOnError(err, "Unable to find file.")

	for _, contributor := range contributors {
		parsedContributor := strings.ReplaceAll(string(contributorBox), "{{LINKEDIN}}", contributor.Linkedin)
		parsedContributor = strings.ReplaceAll(parsedContributor, "{{NAME}}", contributor.Name)
		parsedContributor = strings.ReplaceAll(parsedContributor, "{{EMAIL}}", contributor.Email)
		parsedContributor = strings.ReplaceAll(parsedContributor, "{{GITHUB}}", contributor.Github)
		parsedContributor = strings.ReplaceAll(parsedContributor, "{{SKILLS}}", strings.Join(contributor.Skills, ", "))
		parsedContributors = append(parsedContributors, parsedContributor)
	}
	return strings.Join(parsedContributors, "\n")
}

func getEmailBody(emailType string, contributors []Contributor, project string) string {
	fileName := fmt.Sprintf("templates/%s.html", emailType)
	content, err := ioutil.ReadFile(fileName)

	failOnError(err, "Unable to find file.")

	contributorBoxes := getContributorBoxes(contributors)
	emailBody := strings.ReplaceAll(string(content), "{{PROJECT-NAME}}", project)
	emailBody = strings.ReplaceAll(emailBody, "{{CONTRIBUTOR-BOX}}", contributorBoxes)
	return emailBody
}
