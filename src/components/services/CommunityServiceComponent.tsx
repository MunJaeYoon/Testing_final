import { useState } from "react";
import { motion } from "framer-motion";
import { Users, ThumbsUp, MessageCircle, Play } from "lucide-react";
import ProtectedView from "@/components/ProtectedView";

const posts = [
  { id: 1, author: "DetectiveLee", title: "Found a subtle lip-sync artifact in this deepfake", likes: 234, comments: 18, thumbnail: "🎬" },
  { id: 2, author: "AIWatcher", title: "New GAN model produces nearly undetectable fakes", likes: 189, comments: 42, thumbnail: "🤖" },
  { id: 3, author: "TruthSeeker", title: "Tutorial: How to spot AI-generated backgrounds", likes: 312, comments: 27, thumbnail: "🔍" },
  { id: 4, author: "DataNerd99", title: "Comparison: Real vs Deepfake eye reflection patterns", likes: 156, comments: 11, thumbnail: "👁️" },
];

export default function CommunityServiceComponent() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <ProtectedView serviceName="Community Service">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-magic-blue" />
          <h1 className="text-3xl font-jua text-foreground">Community Feed</h1>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.01 }}
              className="p-5 rounded-xl bg-card border border-border space-y-3"
            >
              <div className="flex items-start gap-4">
                <div className="w-24 h-16 rounded-lg bg-muted flex items-center justify-center text-3xl shrink-0">
                  {post.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">@{post.author}</p>
                  <p className="font-semibold text-foreground">{post.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 text-sm transition-colors ${
                    likedPosts.has(post.id) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </motion.button>
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground ml-auto">
                  <Play className="h-4 w-4" /> Watch
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </ProtectedView>
  );
}
