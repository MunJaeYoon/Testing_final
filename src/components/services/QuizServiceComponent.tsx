import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, CheckCircle, XCircle, Clock } from "lucide-react";
import ProtectedView from "@/components/ProtectedView";

const quizzes = [
  { id: 1, title: "Deepfake Face Swap Detection", difficulty: "Medium", questions: 10, completed: true, score: 85 },
  { id: 2, title: "AI Voice Clone Identification", difficulty: "Hard", questions: 15, completed: true, score: 72 },
  { id: 3, title: "Manipulated Video Spotting", difficulty: "Easy", questions: 8, completed: false, score: 0 },
  { id: 4, title: "GAN Artifact Recognition", difficulty: "Hard", questions: 12, completed: false, score: 0 },
];

export default function QuizServiceComponent() {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [mockProgress, setMockProgress] = useState(0);

  const startQuiz = (id: number) => {
    setActiveQuiz(id);
    setMockProgress(0);
    const interval = setInterval(() => {
      setMockProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 10;
      });
    }, 400);
  };

  return (
    <ProtectedView serviceName="Quiz Service">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-jua text-foreground">Quiz Service</h1>
        </div>

        {activeQuiz !== null ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-xl bg-card border border-border space-y-4">
            <h3 className="font-jua text-lg text-foreground">
              {quizzes.find((q) => q.id === activeQuiz)?.title}
            </h3>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${mockProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{mockProgress}% complete</p>
            {mockProgress >= 100 && (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <p className="text-2xl font-jua text-primary">Score: 88/100</p>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActiveQuiz(null)} className="mt-3 px-4 py-2 rounded-lg bg-card border border-border text-foreground text-sm">
                  ← Back to list
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="space-y-3">
            {quizzes.map((q) => (
              <motion.div
                key={q.id}
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-xl bg-card border border-border flex items-center justify-between cursor-pointer"
                onClick={() => !q.completed && startQuiz(q.id)}
              >
                <div className="flex items-center gap-3">
                  {q.completed ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{q.title}</p>
                    <p className="text-xs text-muted-foreground">{q.questions} questions · {q.difficulty}</p>
                  </div>
                </div>
                {q.completed ? (
                  <span className="text-sm font-jua text-primary">{q.score}%</span>
                ) : (
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">Start →</span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </ProtectedView>
  );
}
