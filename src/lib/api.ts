import type {
  LoginRequest,
  SignupRequest,
  UserProfile,
  QuizQuestion,
  QuizSubmitRequest,
  QuizSubmitResponse,
  CommunityFeed,
  DeepfakeReport,
  CheckoutRequest,
  CheckoutResponse,
  SubscriptionPlan,
} from "./types";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `HTTP ${res.status}`);
  }

  return res.json();
};

export const login = (req: LoginRequest) =>
  request<{ token: string; user: UserProfile }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(req),
  });

export const signup = (req: SignupRequest) =>
  request<{ token: string; user: UserProfile }>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(req),
  });

export const fetchQuizQuestion = () =>
  request<QuizQuestion>("/quiz/quiz.QuizService/GetQuestion", { method: "POST", body: "{}" });

export const submitQuizAnswer = (req: QuizSubmitRequest) =>
  request<QuizSubmitResponse>("/quiz/quiz.QuizService/SubmitAnswer", {
    method: "POST",
    body: JSON.stringify(req),
  });

export const fetchCommunityFeed = () =>
  request<CommunityFeed>("/community/community.CommunityService/GetFeed", {
    method: "POST",
    body: JSON.stringify({ page: 1, limit: 20 }),
  });

export const runVideoAnalysis = (videoFile: File) => {
  const formData = new FormData();
  formData.append("video", videoFile);
  return request<DeepfakeReport>("/video/video.VideoAnalysisService/AnalyzeVideo", {
    method: "POST",
    body: formData,
    headers: {},
  });
};

export const getSubscriptionPlans = () =>
  request<{ plans: SubscriptionPlan[] }>("/payment/payment.PaymentService/GetPlans", {
    method: "POST",
    body: "{}",
  });

export const checkout = (req: CheckoutRequest) =>
  request<CheckoutResponse>("/payment/payment.PaymentService/Checkout", {
    method: "POST",
    body: JSON.stringify(req),
  });
