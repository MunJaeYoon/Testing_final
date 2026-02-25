package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
)

type QuizQuestion struct {
	ID             string   `json:"id"`
	VideoURL       string   `json:"videoUrl"`
	ThumbnailEmoji string   `json:"thumbnailEmoji"`
	Options        []string `json:"options"`
	CorrectIndex   int      `json:"correctIndex"`
	Explanation    string   `json:"explanation"`
	Difficulty     string   `json:"difficulty"`
}

var questions = []QuizQuestion{
	{ID: "q1", ThumbnailEmoji: "🎬", Options: []string{"입 모양이 어색해요", "눈 깜빡임이 없어요", "머리카락이 흔들려요", "목소리가 달라요"}, CorrectIndex: 1, Explanation: "딥페이크 영상에서는 눈 깜빡임이 부자연스러운 경우가 많아요!", Difficulty: "easy"},
	{ID: "q2", ThumbnailEmoji: "🎥", Options: []string{"배경이 자연스러워요", "얼굴 경계가 번져요", "음성이 정확해요", "조명이 일치해요"}, CorrectIndex: 1, Explanation: "얼굴 합성 경계 부분이 번지거나 흐릿한 건 딥페이크의 대표 특징이에요!", Difficulty: "medium"},
}

func getQuestionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(questions[rand.Intn(len(questions))])
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
	http.HandleFunc("/quiz.QuizService/GetQuestion", corsMiddleware(getQuestionHandler))
	log.Println("Quiz service listening on :50052")
	if err := http.ListenAndServe(":50052", nil); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
