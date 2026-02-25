import { motion } from "framer-motion";
import WoodPanel from "@/components/WoodPanel";
import ParchmentPanel from "@/components/ParchmentPanel";
import GameButton from "@/components/GameButton";

const GamePage = () => {
  return (
    <motion.div
      className="grid h-full grid-cols-[2fr_1fr] gap-7 p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <WoodPanel className="flex flex-col">
        <h2 className="font-jua text-3xl mb-5 text-shadow-deep">🎬 가짜를 찾아라!</h2>
        <div
          className="flex flex-1 flex-col items-center justify-center rounded-2xl"
          style={{
            background: "#000",
            border: "6px solid hsl(var(--wood-darkest))",
          }}
        >
          <motion.span
            className="text-6xl mb-5"
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            📺
          </motion.span>
          <span className="font-jua text-xl text-foreground">
            영상을 보고 조작된 곳을 클릭하세요!
          </span>
        </div>
      </WoodPanel>

      <div className="flex flex-col gap-7">
        <ParchmentPanel>
          <h2 className="font-jua text-3xl mb-4 text-shadow-deep" style={{ color: "hsl(var(--wood-darkest))", textShadow: "none" }}>
            📊 내 기록
          </h2>
          <div className="text-xl font-bold" style={{ color: "hsl(var(--wood-darkest))" }}>
            점수: 1,240 점
          </div>
          <div className="text-4xl mt-2.5">❤️ ❤️ 🖤</div>
        </ParchmentPanel>

        <WoodPanel className="flex flex-1 flex-col">
          <h2 className="font-jua text-3xl mb-4 text-shadow-deep">💡 힌트 수첩</h2>
          <ul className="flex-1 list-disc pl-5 text-lg leading-relaxed">
            <li>눈 깜빡임이 어색한가요?</li>
            <li>얼굴빛과 조명이 일치하나요?</li>
          </ul>
          <GameButton variant="green">🔍 돋보기 쓰기</GameButton>
        </WoodPanel>
      </div>
    </motion.div>
  );
};

export default GamePage;
