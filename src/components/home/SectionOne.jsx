import React, { useState, useEffect } from "react";
import { Zoom, Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { Button, Box, useColorModeValue } from "@chakra-ui/react";
import { MdScience, MdSchool, MdPlayArrow, MdStar } from "react-icons/md";

const SectionOne = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "نقدم لك شرحًا مبسطًا وممتعًا للكيمياء",
    "محاضرات عالية الجودة مع أمثلة عملية",
    "منهج شامل يغطي جميع أجزاء الكيمياء",
    "امتحانات دورية لتقييم مستواك المستمر",
  ];

  // Dark Mode Colors
  const bgGradient = useColorModeValue(
    "linear(to-br, #f9fafb, #eff6ff, #faf5ff)",
    "linear(to-br, #1a202c, #2d3748, #1a202c)"
  );
  const animatedBg1 = useColorModeValue(
    "linear(to-br, blue.200, cyan.200)",
    "linear(to-br, blue.500, cyan.500)"
  );
  const animatedBg2 = useColorModeValue(
    "linear(to-tr, purple.200, pink.200)",
    "linear(to-tr, purple.500, pink.500)"
  );
  const decorativeCircle1Color = useColorModeValue(
    "blue.100",
    "blue.500"
  );
  const decorativeCircle2Color = useColorModeValue(
    "purple.100",
    "purple.500"
  );
  const textColor = useColorModeValue("gray.800", "white");
  const textColorSecondary = useColorModeValue("gray.600", "gray.300");
  const textColorTertiary = useColorModeValue("gray.500", "gray.400");
  const cardBg = useColorModeValue(
    "whiteAlpha.800",
    "gray.800"
  );
  const cardBorder = useColorModeValue(
    "whiteAlpha.500",
    "gray.700"
  );
  const cardText = useColorModeValue("gray.800", "white");
  const cardTextSecondary = useColorModeValue("gray.500", "gray.400");
  const imageFrameBg = useColorModeValue(
    "linear(to-br, white, gray.50, blue.50)",
    "linear(to-br, gray.800, gray.700, blue.900)"
  );
  const imagePlaceholderBg = useColorModeValue(
    "linear(to-br, gray.50, blue.50)",
    "linear(to-br, gray.700, blue.900)"
  );
  const glowEffect = useColorModeValue(
    "linear(to-r, blue.200, cyan.200, purple.200)",
    "linear(to-r, blue.500, cyan.500, purple.500)"
  );
  const decorativeElement1Color = useColorModeValue(
    "blue.100",
    "blue.500"
  );
  const decorativeElement2Color = useColorModeValue(
    "cyan.100",
    "cyan.500"
  );
  const waveFill = useColorModeValue("white", "#1a202c");

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(messageTimer);
  }, []);

  return (
    <Box
      position="relative"
      overflow="hidden"
      mt="80px"
      minH="90vh"
      display="flex"
      alignItems="center"
      bgGradient={bgGradient}
    >
      {/* Animated Background Elements - Lighter */}
      <Box
        position="absolute"
        top="0"
        right="0"
        w="96"
        h="96"
        bgGradient={animatedBg1}
        borderRadius="full"
        filter="blur(3xl)"
        opacity={useColorModeValue(0.1, 0.2)}
        className="animate-pulse"
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="96"
        h="96"
        bgGradient={animatedBg2}
        borderRadius="full"
        filter="blur(3xl)"
        opacity={useColorModeValue(0.1, 0.2)}
        className="animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      
      {/* Decorative Circles - Softer */}
      <Box
        position="absolute"
        top="20"
        right="20"
        w="32"
        h="32"
        bg={decorativeCircle1Color}
        borderRadius="full"
        filter="blur(2xl)"
        opacity={0.2}
      />
      <Box
        position="absolute"
        bottom="20"
        left="20"
        w="40"
        h="40"
        bg={decorativeCircle2Color}
        borderRadius="full"
        filter="blur(2xl)"
        opacity={0.2}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8 text-right">
            <Fade direction="right" triggerOnce>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg">
                <MdScience className="text-xl" />
                <span className="font-semibold">مدرس كيمياء محترف</span>
              </div>
            </Fade>

            <Slide direction="right" triggerOnce>
              {/* Main Heading */}
              <Box className="space-y-4">
                <Box
                  as="h1"
                  fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  fontWeight="extrabold"
                 
                  lineHeight="tight"
                >
                  <Box
                    as="span"
                   
                    
                    
                  >
                    أستاذ مصطفى نوفل
                  </Box>
                </Box>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <Box
                    as="p"
                    fontSize={{ base: "xl", md: "2xl" }}
                    color={textColorSecondary}
                    fontWeight="medium"
                  >
                    معلم الكيمياء المتميز
                  </Box>
                </div>
              </Box>
            </Slide>

            <Fade direction="up" delay={200} triggerOnce>
              {/* Description */}
              <Box
                as="p"
                fontSize={{ base: "lg", md: "xl" }}
                color={textColorSecondary}
                lineHeight="relaxed"
                maxW="xl"
              >
                ابدأ رحلتك في عالم الكيمياء مع أفضل شرح وأوضح طريقة. 
                نحول الكيمياء من مادة معقدة إلى رحلة تعليمية ممتعة وسهلة.
              </Box>
            </Fade>

            <Fade direction="up" delay={300} triggerOnce>
              {/* Rotating Messages */}
              <Box
                bg={cardBg}
                backdropFilter="blur(10px)"
                borderRadius="2xl"
                p={6}
                shadow="xl"
                borderWidth="1px"
                borderColor={cardBorder}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                    <MdSchool className="text-white text-xl" />
                  </div>
                  <Box as="p" color={cardTextSecondary} fontWeight="medium">
                    ما نقدمه لك:
                  </Box>
                </div>
                <Box
                  as="p"
                  fontSize="xl"
                  fontWeight="bold"
                  color={cardText}
                  minH="32px"
                  transition="all 0.5s"
                >
                  {messages[currentMessageIndex]}
                </Box>
              </Box>
            </Fade>

            <Fade direction="up" delay={400} triggerOnce>
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  as={Link}
                  to="/courses"
                  size="lg"
                  colorScheme="blue"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  rightIcon={<MdPlayArrow />}
                  style={{ borderRadius: "12px" }}
                >
                  ابدأ التعلم الآن
                </Button>
                <Button
                  as={Link}
                  to="/about"
                  size="lg"
                  variant="outline"
                  borderColor="blue.500"
                  color="blue.600"
                  _hover={{ bg: "blue.50", borderColor: "blue.600" }}
                  style={{ borderRadius: "12px" }}
                >
                  اعرف المزيد
                </Button>
              </div>
            </Fade>

            {/* Stats */}
            <Fade direction="up" delay={500} triggerOnce>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <Box
                    fontSize="3xl"
                    fontWeight="bold"
                    bgGradient="linear(to-r, blue.600, cyan.600)"
                    bgClip="text"
                    color="transparent"
                  >
                    100+
                  </Box>
                  <Box as="div" fontSize="sm" color={textColorSecondary} mt={1}>
                    محاضرة
                  </Box>
                </div>
                <div className="text-center">
                  <Box
                    fontSize="3xl"
                    fontWeight="bold"
                    bgGradient="linear(to-r, blue.600, cyan.600)"
                    bgClip="text"
                    color="transparent"
                  >
                    500+
                  </Box>
                  <Box as="div" fontSize="sm" color={textColorSecondary} mt={1}>
                    طالب
                  </Box>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Box
                    fontSize="3xl"
                    fontWeight="bold"
                    bgGradient="linear(to-r, blue.600, cyan.600)"
                    bgClip="text"
                    color="transparent"
                  >
                    4.9
                  </Box>
                  <MdStar className="text-yellow-400 text-2xl" />
                  <Box as="div" fontSize="sm" color={textColorSecondary} mt={1}>
                    تقييم
                  </Box>
                </div>
              </div>
            </Fade>
          </div>

          {/* Right Side - Image Placeholder */}
          <Zoom triggerOnce delay={300}>
            <div className="relative">
              {/* Image Container */}
              <div className="relative mx-auto max-w-md">
                {/* Glow Effect - Softer */}
                <Box
                  position="absolute"
                  inset="-16px"
                  bgGradient={glowEffect}
                  borderRadius="3xl"
                  filter="blur(2xl)"
                  opacity={useColorModeValue(0.15, 0.3)}
                  className="animate-pulse"
                />
                
                {/* Image Frame */}
                <Box
                  position="relative"
                  bgGradient={imageFrameBg}
                  borderRadius="3xl"
                  p={8}
                  shadow="2xl"
                  borderWidth="4px"
                  borderColor={useColorModeValue("whiteAlpha.500", "gray.700")}
                  transform="auto"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  {/* Placeholder for Teacher Image */}
                  <Box
                    position="relative"
                    w="full"
                    aspectRatio="1"
                    borderRadius="2xl"
                    overflow="hidden"
                    bgGradient={imagePlaceholderBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {/* Placeholder Content */}
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-xl">
                        <MdScience className="text-white text-6xl" />
                      </div>
                      <img src="hero.jpg " className="h-[500px]"/>
                    </div>
                    
                    {/* Decorative Elements - Softer */}
                    <Box
                      position="absolute"
                      top="4"
                      right="4"
                      w="16"
                      h="16"
                      bg={decorativeElement1Color}
                      borderRadius="full"
                      filter="blur(xl)"
                      opacity={0.2}
                    />
                    <Box
                      position="absolute"
                      bottom="4"
                      left="4"
                      w="20"
                      h="20"
                      bg={decorativeElement2Color}
                      borderRadius="full"
                      filter="blur(xl)"
                      opacity={0.2}
                    />
                  </Box>
                </Box>

                {/* Floating Badges */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full shadow-xl transform rotate-12">
                  <div className="flex items-center gap-2">
                    <MdStar className="text-yellow-300" />
                    <span className="font-bold">متميز</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-xl transform -rotate-12">
                  <div className="flex items-center gap-2">
                    <MdSchool className="text-xl" />
                    <span className="font-bold">خبرة 10+ سنوات</span>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </div>
    </div>

      {/* Bottom Wave */}
      <Box position="absolute" bottom="0" left="0" right="0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24">
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1125,75 1200,60 L1200,120 L0,120 Z"
            fill={waveFill}
            opacity="0.8"
          ></path>
        </svg>
      </Box>
    </Box>
  );
};

export default SectionOne;
