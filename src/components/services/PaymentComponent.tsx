import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Check, Zap, Crown, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const tiers = [
  {
    name: "Free",
    price: "$0",
    icon: Shield,
    color: "border-border",
    features: ["5 video analyses/month", "Basic quizzes", "Community access"],
  },
  {
    name: "Pro",
    price: "$19/mo",
    icon: Zap,
    color: "border-primary",
    features: ["Unlimited analyses", "All quizzes + AI hints", "Priority processing", "API access"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99/mo",
    icon: Crown,
    color: "border-accent",
    features: ["Everything in Pro", "Team dashboard", "Custom models", "SLA support", "Dedicated GPU"],
  },
];

export default function PaymentComponent() {
  const [selectedTier, setSelectedTier] = useState("Pro");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <CreditCard className="h-8 w-8 text-accent" />
        <h1 className="text-3xl font-jua text-foreground">Payment Service</h1>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTier(tier.name)}
            className={`p-6 rounded-xl bg-card border-2 cursor-pointer transition-colors relative space-y-4 ${
              selectedTier === tier.name ? tier.color : "border-border"
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                POPULAR
              </span>
            )}
            <tier.icon className="h-8 w-8 text-foreground" />
            <div>
              <p className="text-2xl font-jua text-foreground">{tier.price}</p>
              <p className="text-sm text-muted-foreground">{tier.name}</p>
            </div>
            <ul className="space-y-2">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Mock Checkout */}
      <div className="max-w-md p-6 rounded-xl bg-card border border-border space-y-4">
        <h3 className="font-jua text-lg text-foreground">Checkout — {selectedTier}</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-foreground text-sm">Card Number</Label>
            <Input placeholder="4242 4242 4242 4242" className="bg-background border-border text-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-foreground text-sm">Expiry</Label>
              <Input placeholder="MM/YY" className="bg-background border-border text-foreground" />
            </div>
            <div className="space-y-1">
              <Label className="text-foreground text-sm">CVC</Label>
              <Input placeholder="123" className="bg-background border-border text-foreground" />
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          Subscribe to {selectedTier} →
        </motion.button>
      </div>
    </motion.div>
  );
}
