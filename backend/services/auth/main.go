package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignupRequest struct {
	Email       string `json:"email"`
	Password    string `json:"password"`
	Nickname    string `json:"nickname"`
	AvatarEmoji string `json:"avatarEmoji"`
}

type UserProfile struct {
	ID               string `json:"id"`
	Email            string `json:"email"`
	Nickname         string `json:"nickname"`
	AvatarEmoji      string `json:"avatarEmoji"`
	SubscriptionType string `json:"subscriptionType"`
	Coins            int    `json:"coins"`
	Level            int    `json:"level"`
	LevelTitle       string `json:"levelTitle"`
	XP               int    `json:"xp"`
	CreatedAt        string `json:"createdAt"`
}

type AuthResponse struct {
	Token string      `json:"token"`
	User  UserProfile `json:"user"`
}

var jwtSecret = []byte("dev_jwt_secret_change_in_production")

func generateToken(user UserProfile) (string, error) {
	claims := jwt.MapClaims{
		"sub":         user.ID,
		"email":       user.Email,
		"nickname":    user.Nickname,
		"avatarEmoji": user.AvatarEmoji,
		"role":        user.SubscriptionType,
		"exp":         time.Now().Add(24 * time.Hour).Unix(),
		"iat":         time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if req.Email != "detective@deepfind.io" || req.Password != "password123" {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	user := UserProfile{
		ID:               "usr_001",
		Email:            req.Email,
		Nickname:         "탐정",
		AvatarEmoji:      "🦊",
		SubscriptionType: "free",
		Coins:            1200,
		Level:            5,
		LevelTitle:       "베테랑 탐정",
		XP:               450,
		CreatedAt:        time.Now().Format(time.RFC3339),
	}

	token, err := generateToken(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AuthResponse{Token: token, User: user})
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	var req SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" || req.Nickname == "" {
		http.Error(w, "Email, password, and nickname are required", http.StatusBadRequest)
		return
	}

	if len(req.Password) < 6 {
		http.Error(w, "Password must be at least 6 characters", http.StatusBadRequest)
		return
	}

	user := UserProfile{
		ID:               "usr_new_001",
		Email:            req.Email,
		Nickname:         req.Nickname,
		AvatarEmoji:      req.AvatarEmoji,
		SubscriptionType: "free",
		Coins:            100,
		Level:            1,
		LevelTitle:       "새싹 탐정",
		XP:               0,
		CreatedAt:        time.Now().Format(time.RFC3339),
	}

	token, err := generateToken(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AuthResponse{Token: token, User: user})
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
	http.HandleFunc("/login", corsMiddleware(loginHandler))
	http.HandleFunc("/signup", corsMiddleware(signupHandler))

	log.Println("Auth service listening on :50051")
	if err := http.ListenAndServe(":50051", nil); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
