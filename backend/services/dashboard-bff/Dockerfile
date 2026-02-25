FROM golang:1.23-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY go.mod main.go ./
RUN go mod tidy && go mod download
COPY . .
RUN go mod tidy
RUN go build -o dashboard-bff .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/dashboard-bff .
EXPOSE 50056
CMD ["./dashboard-bff"]
