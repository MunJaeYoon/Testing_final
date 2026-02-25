FROM golang:1.23-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY go.mod main.go ./
RUN go mod tidy && go mod download
COPY . .
RUN go mod tidy
RUN go build -o community-service .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/community-service .
EXPOSE 50053
CMD ["./community-service"]
