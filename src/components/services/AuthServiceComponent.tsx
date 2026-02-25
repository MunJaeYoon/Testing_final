import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle, User, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthServiceComponent() {
  const { isLoggedIn, token, login, logout, user } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) login(username.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-jua text-foreground">Auth Service</h1>
      </div>

      {isLoggedIn ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/30 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">Token Generated</span>
            </div>
            <code className="block text-xs bg-card p-3 rounded-lg text-muted-foreground break-all border border-border">
              {token}
            </code>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <h3 className="font-jua text-lg text-foreground">Avatar Customization</h3>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-2xl font-jua text-primary">
                {user?.avatar}
              </div>
              <p className="text-sm text-muted-foreground">
                Logged in as <span className="text-foreground font-semibold">{user?.username}</span>
              </p>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="px-6 py-2 rounded-lg bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90 transition-colors"
          >
            Logout
          </motion.button>
        </motion.div>
      ) : (
        <div className="max-w-md space-y-4">
          <div className="flex gap-1 bg-card rounded-lg p-1 border border-border">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, x: tab === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === "login" ? 20 : -20 }}
              onSubmit={handleSubmit}
              className="p-6 rounded-xl bg-card border border-border space-y-4"
            >
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <User className="h-4 w-4" />
                  {tab === "login" ? "Username / ID" : "Create ID"}
                </Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-foreground">
                  <KeyRound className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="bg-background border-border text-foreground"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                {tab === "login" ? "Login →" : "Create Account →"}
              </motion.button>
            </motion.form>
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
