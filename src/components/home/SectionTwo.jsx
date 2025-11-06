import React from "react";
import { motion, useInView } from "framer-motion";
import { Box, Flex, Heading, Text, useColorModeValue, Icon } from "@chakra-ui/react";
import { MdScience, MdVideoLibrary, MdQuiz, MdAssignment, MdLiveTv } from "react-icons/md";
import { FaFlask } from "react-icons/fa";

const SectionTwo = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const bgGradient = useColorModeValue(
    "linear(to-br, #f0f4ff, #e5e8ff)",
    "linear(to-br, #1a202c, #2d3748)"
  );
  const cardBg = useColorModeValue("rgba(255, 255, 255, 0.9)", "rgba(45, 55, 72, 0.8)");
  const textColor = useColorModeValue("gray.900", "white");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");

  const features = [
    {
      id: 1,
      name: "محاضرات كيمياء شاملة",
      description: "شرح مبسط ومفصل لجميع أجزاء الكيمياء مع أمثلة عملية وتجارب واضحة.",
      icon: MdVideoLibrary,
      color: "blue.500",
    },
    {
      id: 2,
      name: "امتحانات دورية",
      description: "امتحانات شهرية وشاملة لتقييم مستواك ومتابعة تقدمك في الكيمياء.",
      icon: MdQuiz,
      color: "cyan.500",
    },
    {
      id: 3,
      name: "تجارب معملية",
      description: "شرح تفصيلي للتجارب العملية مع فيديوهات توضيحية للتفاعلات الكيميائية.",
      icon: FaFlask,
      color: "purple.500",
    },
    {
      id: 4,
      name: "جلسات مباشرة",
      description: "جلسات تفاعلية مباشرة مع أستاذ مصطفى نوفل للرد على أسئلتك مباشرة.",
      icon: MdLiveTv,
      color: "orange.500",
    },
    {
      id: 5,
      name: "ملخصات ومراجعات",
      description: "ملخصات شاملة ومراجعات سريعة قبل الامتحانات لضمان أفضل النتائج.",
      icon: MdAssignment,
      color: "pink.500",
    },
    {
      id: 6,
      name: "شرح التفاعلات",
      description: "شرح مفصل لجميع التفاعلات الكيميائية مع التوازن والمعادلات.",
      icon: MdScience,
      color: "green.500",
    },
  ];
 const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  return (
    <Box w="full" py={10} px={6} className="" textAlign="center">
      <motion.h1
              variants={fadeInUp}
              className="text-6xl my-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent sm:text-5xl lg:text-7xl font-extrabold leading-tight">
        خدماتنا التعليمية في الكيمياء
      </motion.h1>
      <Text fontSize="lg" color="blue.500" mb={10}>
        ابدأ رحلتك في عالم الكيمياء مع أستاذ مصطفى نوفل - شرح مبسط، أمثلة عملية، ونتائج مضمونة
      </Text>

      <Flex wrap="wrap" justify="center" gap={8}>
        {features.map((service) => (
          <Box
            key={service.id}
            p={8}
            bg={cardBg}
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.18)"
            borderRadius="2xl"
            boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
            transition="transform 0.4s ease, box-shadow 0.4s ease"
            _hover={{
              transform: "translateY(-10px)",
              boxShadow: "0 12px 50px rgba(0, 0, 0, 0.2)",
            }}
            w={{ base: "100%", sm: "45%", md: "30%", lg: "30%" }}
          >
            <Flex justify="center" align="center" mb={6}>
              <Box
                bg={service.color}
                p={5}
                borderRadius="full"
                boxShadow="inset 0 0 10px rgba(0,0,0,0.1)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.4s"
                _hover={{ transform: "scale(1.1) rotate(10deg)" }}
              >
                <Icon as={service.icon} boxSize={10} color="white" />
              </Box>
            </Flex>
            <Heading fontSize="xl" fontWeight="bold" bgGradient="linear(to-r, blue.600, cyan.600)" bgClip="text" mb={3}>
              {service.name}
            </Heading>
            <Text fontSize="md" color={descriptionColor}>
              {service.description}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default SectionTwo;
