import { useAuth } from "@/contexts/AuthContext";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ProtectedView({ children, serviceName }: { children: ReactNode; serviceName: string }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4 text-center"
      >
        <div className="p-6 rounded-full bg-card border border-border">
          <Lock className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-jua text-foreground">{serviceName} — Requires Auth Token</h2>
        <p className="text-muted-foreground max-w-md">
          This service requires a valid gRPC metadata token. Please authenticate first.
        </p>
        <Link
          to="/auth"
          className="mt-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          Go to Auth Service →
        </Link>
      </motion.div>
    );
  }

  return <>{children}</>;
}
