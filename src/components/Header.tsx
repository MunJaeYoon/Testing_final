import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { id: "/", label: "🏠 마을 입구", key: "home" },
  { id: "/game", label: "🎮 게임", key: "game" },
  { id: "/analysis", label: "🔮 분석", key: "anal" },
  { id: "/community", label: "📜 광장", key: "comm" },
  { id: "/shop", label: "🛒 상점", key: "shop" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative z-50 flex h-20 flex-shrink-0 items-center justify-between px-6 md:px-10 wood-texture"
      style={{
        backgroundColor: "hsl(var(--wood-dark))",
        borderBottom: "6px solid hsl(var(--wood-darkest))",
        boxShadow: "0 15px 30px rgba(0,0,0,0.7)",
      }}
    >
      <motion.div
        className="font-jua cursor-pointer flex items-center gap-2.5 text-3xl text-foreground text-shadow-deep"
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl drop-shadow-lg">🌲</span> DeepFind
      </motion.div>

      <nav className="flex gap-2.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.id;
          return (
            <motion.button
              key={item.key}
              onClick={() => navigate(item.id)}
              className={`font-jua rounded-xl px-4 py-2.5 text-lg cursor-pointer transition-colors ${
                isActive
                  ? "bg-wood-base text-foreground border-2 border-wood-darkest"
                  : "bg-black/40 text-amber-100 border-2 border-transparent"
              }`}
              style={{
                boxShadow: isActive
                  ? "0 8px 15px rgba(0,0,0,0.5)"
                  : "inset 0 2px 5px rgba(0,0,0,0.3)",
              }}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95, y: 2 }}
            >
              {item.label}
            </motion.button>
          );
        })}
      </nav>
    </motion.header>
  );
};

export default Header;
