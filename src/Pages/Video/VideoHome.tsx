import { Box, Button, Img } from "@chakra-ui/react";
import React, { useState } from "react";
import { MotionBox } from "../../Components/Animation/AnimationComponents";
import { ChatIcon, PhoneIcon } from "@chakra-ui/icons";
import { FadeToggle } from "../../Components/Animation/FadeToggle";
export const VideoHome = () => {
  const [isPhone, setIsPhone] = useState(false);
  console.log(isPhone);

  return (
    <Box>
      <MotionBox
        overflow="hidden"
        initial={{
          width: 500,
          height: 500,
        }}
        animate={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
        transition={{ duration: 3 }}
      >
        <Img src="/lights.avif" />
      </MotionBox>

      <Button onClick={() => setIsPhone((prev) => !prev)}>Click</Button>
      <Box p={20} overflow="hidden">
        <FadeToggle
          showFirst={isPhone}
          first={<PhoneIcon fontSize="5xl" />}
          second={<ChatIcon fontSize="5xl" />}
        />
      </Box>
    </Box>
  );
};
