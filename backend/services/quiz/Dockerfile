FROM golang:1.23-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY go.mod main.go ./
RUN go mod tidy && go mod download
COPY main.go ./
RUN go build -o quiz-service ./main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/quiz-service .
EXPOSE 50052
CMD ["./quiz-service"]
