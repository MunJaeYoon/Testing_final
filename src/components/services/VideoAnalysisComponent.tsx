import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Video, Upload, CheckCircle, Loader2, Clock, FileVideo } from "lucide-react";
import ProtectedView from "@/components/ProtectedView";

type TaskStatus = "queued" | "uploading" | "processing" | "complete";

interface Task {
  id: number;
  name: string;
  status: TaskStatus;
}

const statusConfig: Record<TaskStatus, { icon: typeof Clock; color: string; label: string }> = {
  queued: { icon: Clock, color: "text-muted-foreground", label: "Queued" },
  uploading: { icon: Loader2, color: "text-accent", label: "Uploading" },
  processing: { icon: Loader2, color: "text-secondary", label: "Processing via SageMaker (MCP)" },
  complete: { icon: CheckCircle, color: "text-primary", label: "Complete" },
};

export default function VideoAnalysisComponent() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "interview_clip.mp4", status: "complete" },
    { id: 2, name: "news_anchor.mp4", status: "processing" },
    { id: 3, name: "speech_video.mp4", status: "uploading" },
  ]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(() => {
    setIsDragOver(false);
    const newTask: Task = {
      id: Date.now(),
      name: `video_${Math.random().toString(36).slice(2, 6)}.mp4`,
      status: "queued",
    };
    setTasks((prev) => [newTask, ...prev]);

    // simulate progression
    setTimeout(() => setTasks((p) => p.map((t) => (t.id === newTask.id ? { ...t, status: "uploading" } : t))), 1000);
    setTimeout(() => setTasks((p) => p.map((t) => (t.id === newTask.id ? { ...t, status: "processing" } : t))), 3000);
    setTimeout(() => setTasks((p) => p.map((t) => (t.id === newTask.id ? { ...t, status: "complete" } : t))), 6000);
  }, []);

  return (
    <ProtectedView serviceName="Video Analysis Service">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center gap-3">
          <Video className="h-8 w-8 text-secondary" />
          <h1 className="text-3xl font-jua text-foreground">Video Analysis</h1>
        </div>

        {/* Drop Zone */}
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); handleDrop(); }}
          onClick={handleDrop}
          animate={{ borderColor: isDragOver ? "hsl(122,52%,33%)" : "hsl(16,28%,19%)" }}
          className="p-12 rounded-xl border-2 border-dashed bg-card/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-card transition-colors"
        >
          <Upload className={`h-12 w-12 ${isDragOver ? "text-primary" : "text-muted-foreground"}`} />
          <p className="font-semibold text-foreground">Drop video files here or click to upload</p>
          <p className="text-sm text-muted-foreground">Supports MP4, AVI, MOV — Max 500MB</p>
        </motion.div>

        {/* Task Queue */}
        <div className="space-y-3">
          <h3 className="font-jua text-lg text-foreground">Task Queue</h3>
          {tasks.map((task) => {
            const cfg = statusConfig[task.status];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-card border border-border flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileVideo className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">{task.name}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${cfg.color}`}>
                  <Icon className={`h-4 w-4 ${task.status === "uploading" || task.status === "processing" ? "animate-spin" : ""}`} />
                  {cfg.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mock Analysis Result */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-3">
          <h3 className="font-jua text-lg text-foreground">Analysis Result — interview_clip.mp4</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Deepfake Probability", "87.3%"],
              ["Face Swap Detected", "Yes"],
              ["Audio Consistency", "Low"],
              ["Confidence Score", "0.92"],
            ].map(([label, value]) => (
              <div key={label} className="p-3 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-lg font-jua text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </ProtectedView>
  );
}
