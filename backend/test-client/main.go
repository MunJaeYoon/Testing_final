package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func testService(name, address string) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	conn, err := grpc.DialContext(ctx, address, 
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock())
	
	if err != nil {
		fmt.Printf("❌ %s (%s): Failed to connect - %v\n", name, address, err)
		return
	}
	defer conn.Close()
	
	fmt.Printf("✅ %s (%s): Connected successfully\n", name, address)
}

func main() {
	fmt.Println("=== Testing Pawfiler gRPC Services ===\n")
	
	services := map[string]string{
		"Auth Service":       "localhost:50051",
		"Quiz Service":       "localhost:50052",
		"Community Service":  "localhost:50053",
		"Payment Service":    "localhost:50055",
		"Dashboard BFF":      "localhost:50056",
	}
	
	for name, addr := range services {
		testService(name, addr)
	}
	
	fmt.Println("\n=== Testing Complete ===")
}
