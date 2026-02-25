import { motion } from "framer-motion";
import { LayoutDashboard, User, Brain, Users, TrendingUp, Activity } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const widgets = [
  { title: "User Profile Summary", icon: User, color: "text-secondary", value: "Active", sub: "Last login: 2 min ago" },
  { title: "Recent Quiz Progress", icon: Brain, color: "text-primary", value: "78%", sub: "12 quizzes completed" },
  { title: "Trending Posts", icon: TrendingUp, color: "text-accent", value: "156", sub: "New posts today" },
  { title: "Community Activity", icon: Users, color: "text-magic-blue", value: "2.4k", sub: "Active users" },
  { title: "Videos Analyzed", icon: Activity, color: "text-primary", value: "89", sub: "This month" },
  { title: "Detection Accuracy", icon: Brain, color: "text-accent", value: "94.2%", sub: "Avg across all users" },
];

export default function DashboardServiceComponent() {
  const { isLoggedIn, user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-8 w-8 text-accent" />
        <h1 className="text-3xl font-jua text-foreground">Dashboard</h1>
      </div>

      {isLoggedIn && (
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
          <p className="text-foreground">
            Welcome back, <span className="font-jua text-primary">{user?.username}</span>! Here's your aggregated overview.
          </p>
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {widgets.map((w) => (
          <motion.div
            key={w.title}
            variants={item}
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-5 rounded-xl bg-card border border-border space-y-3 cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{w.title}</span>
              <w.icon className={`h-5 w-5 ${w.color}`} />
            </div>
            <p className="text-3xl font-jua text-foreground">{w.value}</p>
            <p className="text-xs text-muted-foreground">{w.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
