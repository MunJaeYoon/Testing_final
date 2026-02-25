package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Post struct {
	ID             string   `json:"id"`
	AuthorNickname string   `json:"authorNickname"`
	AuthorEmoji    string   `json:"authorEmoji"`
	Title          string   `json:"title"`
	Body           string   `json:"body"`
	Likes          int      `json:"likes"`
	Comments       int      `json:"comments"`
	CreatedAt      string   `json:"createdAt"`
	Tags           []string `json:"tags"`
}

type FeedResponse struct {
	Posts      []Post `json:"posts"`
	TotalCount int    `json:"totalCount"`
	Page       int    `json:"page"`
}

var mockPosts = []Post{
	{ID: "p1", AuthorNickname: "꼬마 탐정", AuthorEmoji: "🐱", Title: "딥페이크 찾는 꿀팁 공유!", Body: "눈 깜빡임을 잘 보세요...", Likes: 42, Comments: 7, CreatedAt: "2026-02-20T10:00:00Z", Tags: []string{"팁", "초보"}},
	{ID: "p2", AuthorNickname: "수리 부엉이", AuthorEmoji: "🦉", Title: "레벨 10 달성 후기", Body: "드디어 마스터 탐정이 되었어요!", Likes: 128, Comments: 23, CreatedAt: "2026-02-22T15:30:00Z", Tags: []string{"후기", "레벨업"}},
}

func getFeedHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(FeedResponse{Posts: mockPosts, TotalCount: len(mockPosts), Page: 1})
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
	http.HandleFunc("/community.CommunityService/GetFeed", corsMiddleware(getFeedHandler))
	log.Println("Community service listening on :50053")
	if err := http.ListenAndServe(":50053", nil); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
