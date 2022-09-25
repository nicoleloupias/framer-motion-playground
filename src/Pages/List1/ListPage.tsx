// @ts-nocheck

import { Box, Button, Stack, Text } from "@chakra-ui/react";
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
  transform,
} from "framer-motion";
import {
  Children,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MotionBox } from "../../Components/Animation/AnimationComponents";
import { snap } from "popmotion";

type AlignUnion = "start" | "center" | "end";

type PageViewContextProps = {
  align: AlignUnion;
  index: number;
  frameSize: number;
  trackSize: number;
  trackXOffset: MotionValue;
};

const PageContext = createContext<PageViewContextProps | undefined>(undefined);

const usePageContext = () => {
  const contextValue = useContext(PageContext);
  if (!contextValue) {
    throw new Error("Missing context");
  }
  return contextValue;
};

const viewSize = 300;
const alignOptions = { start: 0, center: 0.5, end: 1 };

const TextBox = ({ text }: { text: string }) => {
  const { align, frameSize, index, trackSize, trackXOffset } = usePageContext();
  const initialOffset = index * viewSize;
  const alignOffset = (frameSize - viewSize) * alignOptions[align];

  const startOffset = useTransform(trackXOffset, (value) => {
    let startOffset = initialOffset + value;

    while (startOffset > trackSize - viewSize - alignOffset) {
      startOffset = startOffset - trackSize;
    }

    while (startOffset < 0 - viewSize - alignOffset) {
      startOffset = startOffset + trackSize;
    }

    return startOffset;
  });

  const normalOffset = useTransform(startOffset, (startOffset) => {
    const staticOffset = startOffset - trackXOffset.get();
    const getNormalOffset = transform(
      [-staticOffset - viewSize, -staticOffset, -staticOffset + viewSize],
      [-1, 0, 1]
    );
    return getNormalOffset(trackXOffset.get());
  });

  const opacity = useTransform(normalOffset, [-1, 0, 1], [0.6, 1, 0.6]);
  const scale = useTransform(normalOffset, [-1, 0, 1], [0.8, 1, 0.8]);
  const x = useTransform(
    startOffset,
    (startOffset) => startOffset + alignOffset
  );
  return (
    <MotionBox
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        x,
        y: 0,
        width: viewSize,
        height: viewSize,
        opacity,
        scale,
      }}
    >
      {text}
    </MotionBox>
  );
};

type PagerViewProps = {
  align?: AlignUnion;
  children: React.ReactNode;
};

const Page = ({ align, children }: PagerViewProps) => {
  const frameRef = useRef();
  const [frameSize, setFrameSize] = useState(-1);
  const trackSize = Children.count(children) * viewSize;
  const trackXOffset = useMotionValue(0);

  const snapTo = snap(viewSize);
  const moveTrackPosition = (amount: number) => {
    const nextXOffset = trackXOffset.get() + amount;
    animate(trackXOffset, snapTo(nextXOffset), {
      type: "spring",
      damping: 80,
      stiffness: 400,
    });
  };

  useLayoutEffect(() => {
    setFrameSize(frameRef.current.offsetWidth);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <motion.div ref={frameRef} style={{ overflow: "hidden" }}>
        <motion.div
          drag="x"
          _dragX={trackXOffset}
          dragTransition={{
            power: 1,
            bounceStiffness: 100,
            modifyTarget: (value) => snapTo(value),
          }}
          style={{
            position: "relative",
            height: viewSize,
            width: trackSize,
            // background: 'linear-gradient(to right, blue, lightblue)',
          }}
        >
          {Children.map(children, (child, index) => (
            <PageContext.Provider
              value={{
                index,
                align,
                frameSize,
                trackSize,
                trackXOffset: trackXOffset,
              }}
            >
              {child}
            </PageContext.Provider>
          ))}
        </motion.div>
      </motion.div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 16,
          gap: 8,
        }}
      >
        <button onClick={() => moveTrackPosition(viewSize)}>Prev</button>
        <button onClick={() => moveTrackPosition(-viewSize)}>Next</button>
      </div>
    </div>
  );
};

export const ListPage = () => {
  const elements = [
    {
      subtitle: "Do it yourself",
      title: "Making a Minjito",
    },
    {
      subtitle: "Step 1",
      title: "Add some ice cubes",
    },
    {
      subtitle: "Step 2",
      title: "Add 200ml of Rio cocktail",
    },
    {
      subtitle: "Step 3",
      title: "Add a pinch of pink salt",
    },
    {
      subtitle: "Step 4",
      title: "Add 100ml of soda",
    },
    {
      subtitle: "Final step",
      title: "Garnish with lemon & rosemary",
    },
  ];

  return (
    <Box>
      <Page align="center">
        {elements.map((element, index) => (
          <TextBox key={index} text={element.title} />
        ))}
      </Page>

      {/* <Box position="relative" w="300px" h="270px" overflow="hidden">
        {elements.map((element) => {
          return (
            <MotionBox key={element.title} mb={8}>
              <Text fontFamily="Inter Tight" fontSize="50px">
                {element.title}
              </Text>
            </MotionBox>
          );
        })} */}
      {/* 
        <Box
          bottom="23px"
          left="0"
          w="full"
          h="119px"
          position="absolute"
          bg="linear-gradient(0deg, rgb(255 255 255) 0%, rgba(255,255,255,0) 100%)"
        ></Box>
      </Box>
      <Stack direction="row" mt={10}>
        <Button onClick={handlePrev}> Prev </Button>
        <Button onClick={handleNext}> Next </Button>
      </Stack> */}
    </Box>
  );
};
