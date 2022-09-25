import { Box, Button, Stack, Text } from "@chakra-ui/react";
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
  transform,
} from "framer-motion";
import { useState } from "react";
import { MotionBox } from "../../Components/Animation/AnimationComponents";
import { snap } from "popmotion";
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

  const [activeIndex, setActiveIndex] = useState(0);
  const handleNext = () => {
    const newActiveIndex = activeIndex + 1;
    setActiveIndex(newActiveIndex);
  };

  const handlePrev = () => {
    const newActiveIndex = activeIndex - 1;
    setActiveIndex(newActiveIndex);
  };

  return (
    <Box>
      <Box position="relative" w="300px" h="270px" overflow="hidden">
        {elements.map((element) => {
          return (
            <MotionBox key={element.title} mb={8}>
              <Text fontFamily="Inter Tight" fontSize="50px">
                {element.title}
              </Text>
            </MotionBox>
          );
        })}

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
      </Stack>
    </Box>
  );
};
