import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { User, Crown, Mail, MapPin, Edit } from "lucide-react";
import ProtectedView from "@/components/ProtectedView";

export default function UserServiceComponent() {
  const { user } = useAuth();

  return (
    <ProtectedView serviceName="User Service">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-secondary" />
          <h1 className="text-3xl font-jua text-foreground">User Service</h1>
        </div>

        {/* Profile Card */}
        <div className="p-6 rounded-xl bg-card border border-border flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center text-3xl font-jua text-secondary">
            {user?.avatar}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-jua text-foreground">{user?.username}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              <span>{user?.username.toLowerCase()}@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>Seoul, Korea</span>
            </div>
          </div>
        </div>

        {/* Premium Badge */}
        <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-accent" />
            <div>
              <p className="font-semibold text-foreground">Premium Subscription</p>
              <p className="text-sm text-muted-foreground">
                {user?.isPremium ? "Active — Full Access" : "Free Tier — Upgrade for more features"}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${user?.isPremium ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
            {user?.isPremium ? "PRO" : "FREE"}
          </span>
        </div>

        {/* Editable Info Section */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-jua text-lg text-foreground">Detailed Info</h3>
            <motion.button whileTap={{ scale: 0.9 }} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80">
              <Edit className="h-4 w-4" /> Edit
            </motion.button>
          </div>
          {[
            ["Display Name", user?.username],
            ["Bio", "AI enthusiast & deepfake detective"],
            ["Joined", "2025-01-15"],
            ["Quizzes Completed", "42"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-border/50 pb-2 last:border-0">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="text-sm text-foreground font-medium">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </ProtectedView>
  );
}
