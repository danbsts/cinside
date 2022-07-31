FROM golang:1.18-alpine3.15

WORKDIR /e-sender

COPY templates ./templates

COPY go.mod .
COPY go.sum .
RUN go mod download
COPY *.env .

COPY *.go .
RUN go build -o /docker-gs-ping

CMD [ "/docker-gs-ping" ]
