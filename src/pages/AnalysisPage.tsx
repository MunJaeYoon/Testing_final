import { motion } from "framer-motion";
import WoodPanel from "@/components/WoodPanel";
import ParchmentPanel from "@/components/ParchmentPanel";
import GameButton from "@/components/GameButton";

const AnalysisPage = () => {
  return (
    <motion.div
      className="grid h-full grid-cols-[1.2fr_1fr] gap-7 items-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ParchmentPanel className="flex flex-col gap-5">
        <h2 className="font-jua text-4xl" style={{ color: "hsl(var(--wood-darkest))" }}>
          🔮 마법 구슬 분석기
        </h2>
        <p className="text-lg leading-relaxed" style={{ color: "hsl(var(--wood-dark))" }}>
          가짜인지 궁금한 영상 파일을 올리거나, 주소를 적어주세요!
        </p>

        {/* Drop zone */}
        <motion.div
          className="cursor-pointer rounded-2xl bg-white p-10 text-center"
          style={{ border: "4px dashed hsl(var(--parchment-border))" }}
          whileHover={{
            borderColor: "hsl(199,97%,37%)",
            backgroundColor: "#E1F5FE",
            scale: 1.02,
          }}
        >
          <motion.div
            className="text-6xl"
            animate={{ y: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            ☁️
          </motion.div>
          <div className="font-jua text-xl mt-2.5" style={{ color: "hsl(var(--wood-darkest))" }}>
            영상 파일 끌어놓기
          </div>
        </motion.div>

        {/* URL input */}
        <div
          className="flex items-center rounded-xl bg-white px-4"
          style={{ border: "4px solid hsl(var(--parchment-border))" }}
        >
          <span className="text-2xl">🔗</span>
          <input
            type="text"
            placeholder="영상 주소(URL) 붙여넣기..."
            className="flex-1 border-none bg-transparent p-4 text-lg outline-none font-gothic"
            style={{ color: "hsl(var(--parchment-text))" }}
          />
        </div>

        <GameButton variant="blue" className="text-2xl">
          ✨ 마법 구슬아, 분석해줘!
        </GameButton>
      </ParchmentPanel>

      <WoodPanel className="flex h-full flex-col items-center justify-center text-center">
        <h2 className="font-jua text-3xl mb-7 text-shadow-deep">결과 대기 중...</h2>
        <motion.div
          className="flex items-center justify-center rounded-full text-8xl mb-7"
          style={{
            width: 220,
            height: 220,
            background: "radial-gradient(circle, #E1F5FE, hsl(199,97%,37%))",
            border: "10px solid #B3E5FC",
            boxShadow: "0 0 60px hsl(199,97%,37%)",
          }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          ?
        </motion.div>
      </WoodPanel>
    </motion.div>
  );
};

export default AnalysisPage;
