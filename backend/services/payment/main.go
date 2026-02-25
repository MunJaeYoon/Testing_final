package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type SubscriptionPlan struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	Price    int      `json:"price"`
	Currency string   `json:"currency"`
	Features []string `json:"features"`
}

type PlansResponse struct {
	Plans []SubscriptionPlan `json:"plans"`
}

var mockPlans = []SubscriptionPlan{
	{ID: "monthly", Name: "월간 프리미엄", Price: 4900, Currency: "KRW", Features: []string{"무제한 분석", "광고 제거", "프리미엄 뱃지", "우선 분석 큐"}},
	{ID: "yearly", Name: "연간 프리미엄", Price: 39000, Currency: "KRW", Features: []string{"무제한 분석", "광고 제거", "프리미엄 뱃지", "우선 분석 큐", "보너스 코인 500닢"}},
}

func getPlansHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(PlansResponse{Plans: mockPlans})
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func main() {
	http.HandleFunc("/payment.PaymentService/GetPlans", corsMiddleware(getPlansHandler))
	log.Println("Payment service listening on :50055")
	if err := http.ListenAndServe(":50055", nil); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
