import { Fade, Zoom } from "react-awesome-reveal";
import { Box, useColorModeValue } from "@chakra-ui/react";
import img from "../../img/logo22 (1).png";

const SectionFour = () => {
  const bgGradient = useColorModeValue(
    "linear(to-r, #dbeafe, #e0f2fe, #f3e8ff)",
    "linear(to-r, #1e3a8a, #0e7490, #581c87)"
  );
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      className="my-9 p-3"
      bgGradient={bgGradient}
      style={{
        borderTopLeftRadius: "100px",
        borderBottomLeftRadius: "100px",
      }}
    >
      <div className="w-[95%] h-[450px] m-auto md:flex justify-between items-center">
        <div>
          <Zoom>
            <img src="1749837322999-removebg-preview.png" className="h-[300px] m-auto" />
          </Zoom>
        </div>
        <div className="text-center">
          <Fade bottom>
            <h1 className="big-font md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              تعلم الكيمياء مع أستاذ مصطفى نوفل
            </h1>
            <p className={`text-lg md:text-xl mt-3 font-medium`} style={{ color: textColor }}>
              نحول الكيمياء من مادة معقدة إلى رحلة تعليمية ممتعة
            </p>
          </Fade>
        </div>
      </div>
    </Box>
  );
};

export default SectionFour;
