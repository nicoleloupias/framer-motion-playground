import { AnimatePresence } from "framer-motion";
import { MotionBox } from "./AnimationComponents";

export const FadeToggle = ({ showFirst, first, second }: any) => {
  return (
    <AnimatePresence>
      {showFirst && (
        <MotionBox
          position="absolute"
          overflow="hidden"
          key="1"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.5, ease: "easeIn" },
          }}
          exit={{ opacity: 0 }}
        >
          {first}
        </MotionBox>
      )}
      {!showFirst && (
        <MotionBox
          position="absolute"
          key="2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.5, ease: "easeIn" },
          }}
          exit={{ opacity: 0 }}
        >
          {second}
        </MotionBox>
      )}
    </AnimatePresence>
  );
};
