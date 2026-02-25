import { motion } from "framer-motion";
import ParchmentPanel from "@/components/ParchmentPanel";

const CommunityPage = () => {
  return (
    <motion.div
      className="flex h-full items-center justify-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ParchmentPanel className="flex flex-col items-center justify-center text-center max-w-lg w-full py-16">
        <motion.div
          className="text-7xl mb-5"
          animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          📜
        </motion.div>
        <h2
          className="font-jua text-4xl mb-4"
          style={{ color: "hsl(var(--wood-darkest))" }}
        >
          동물들의 광장
        </h2>
        <p className="text-lg leading-relaxed" style={{ color: "hsl(var(--wood-dark))" }}>
          게시판이 열리면 다른 탐정들과 꿀팁을 나눌 수 있어요!
        </p>
      </ParchmentPanel>
    </motion.div>
  );
};

export default CommunityPage;
