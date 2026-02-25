import { motion } from "framer-motion";
import WoodPanel from "@/components/WoodPanel";

const ShopPage = () => {
  return (
    <motion.div
      className="flex h-full items-center justify-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <WoodPanel className="flex flex-col items-center justify-center text-center max-w-lg w-full py-16">
        <motion.div
          className="text-7xl mb-5"
          animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🛒
        </motion.div>
        <h2 className="font-jua text-4xl mb-4 text-shadow-deep">비밀 상점</h2>
        <p className="text-lg leading-relaxed">
          열심히 모은 코인으로 마법 돋보기 등<br />
          멋진 탐정 도구를 구매하세요!
        </p>
      </WoodPanel>
    </motion.div>
  );
};

export default ShopPage;
