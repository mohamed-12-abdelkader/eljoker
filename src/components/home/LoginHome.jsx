import React, { useMemo } from "react";
import GitTeacherByToken from "../../Hooks/student/GitTeacherByToken";
import { Card, CardBody, Skeleton, Stack, Box, Heading, Text, useColorModeValue, Avatar } from "@chakra-ui/react";
import { FaVideo, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";
import ScrollToTop from "../scollToTop/ScrollToTop";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Lectures from "../../components/lecture/Lectures";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import SectionTwo from "./SectionTwo";
import AllTeacherLogin from "../teacher/AllTeacherLogin";
import FreeCourses from "./FreeCourses";
import TeacherDetails from "../../pages/teacher/TeacherDetails";
import MyCourses from "../course/MyCourses";

const LoginHome = () => {
  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const studentName = user?.name || "طالبنا";

  const sectionBg = useColorModeValue(
    "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #f8fafc 100%)",
    "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
  );
  const blobColor = useColorModeValue("blue.300", "blue.600");
  const nameColor = useColorModeValue("gray.800", "white");
  const subColor = useColorModeValue("gray.600", "gray.400");
  const badgeBg = useColorModeValue("blue.100", "blue.900");
  const badgeColor = useColorModeValue("blue.700", "blue.200");
  const accentLine = useColorModeValue("linear-gradient(90deg, transparent, #3b82f6, #0ea5e9, transparent)", "linear-gradient(90deg, transparent, #60a5fa, #38bdf8, transparent)");
  const sectionShadow = useColorModeValue("0 4px 24px rgba(59, 130, 246, 0.12), 0 2px 8px rgba(0,0,0,0.04)", "0 4px 24px rgba(0,0,0,0.4)");
  const sectionBorder = useColorModeValue("blue.100", "whiteAlpha.100");
  const blobOpacityLight = useColorModeValue(0.15, 0.2);
  const blobOpacityBottom = useColorModeValue(0.1, 0.15);

  return (
    <div className="mt-[50px]">
      {/* سيكشن ترحيب — هيرو */}
      <Box
        as="section"
        dir="rtl"
        position="relative"
        overflow="hidden"
        mx={{ base: 3, md: 6 }}
        mb={8}
        py={{ base: 10, md: 14 }}
        px={{ base: 5, md: 10 }}
        bg={sectionBg}
        borderRadius="2xl"
        boxShadow={sectionShadow}
        borderWidth="1px"
        borderColor={sectionBorder}
      >
        {/* شكل زينة خلفية */}
        <Box
          position="absolute"
          top="-80px"
          right="-80px"
          w="320px"
          h="320px"
          borderRadius="full"
          bg={blobColor}
          opacity={blobOpacityLight}
          filter="blur(70px)"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="-60px"
          left="-60px"
          w="240px"
          h="240px"
          borderRadius="full"
          bg={blobColor}
          opacity={blobOpacityBottom}
          filter="blur(60px)"
          pointerEvents="none"
        />

        <Box position="relative" zIndex={1} maxW="3xl" mx="auto" textAlign="center">
          {/* أفاتار / أيقونة */}
          <Box mb={5}>
            {user?.avatar ? (
              <Avatar
                size="2xl"
                name={studentName}
                src={user.avatar}
                borderWidth="4px"
                borderColor="white"
                boxShadow="0 8px 32px rgba(59, 130, 246, 0.25)"
              />
            ) : (
              <Box
                w={20}
                h={20}
                borderRadius="full"
                bgGradient="linear(to-br, blue.500, blue.600)"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                borderWidth="4px"
                borderColor="white"
                boxShadow="0 8px 32px rgba(59, 130, 246, 0.3)"
              >
                <FaGraduationCap size={36} color="white" />
              </Box>
            )}
          </Box>

          {/* شارة طالب */}
          <Box
            as="span"
            display="inline-block"
            px={3}
            py={1}
            mb={3}
            borderRadius="full"
            bg={badgeBg}
            color={badgeColor}
            fontSize="xs"
            fontWeight="600"
            letterSpacing="wider"
          >
            طالب
          </Box>

          {/* مرحبا، الاسم */}
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            color={nameColor}
            fontWeight="800"
            lineHeight="1.3"
            mb={2}
          >
            مرحبا، {studentName}
          </Heading>

          {/* خط زينة تحت الاسم */}
          <Box
            w="120px"
            h="3px"
            mx="auto"
            mb={4}
            borderRadius="full"
            bgGradient={accentLine}
            opacity={0.9}
          />

          <Text fontSize={{ base: "sm", md: "md" }} color={subColor} maxW="md" mx="auto" lineHeight="tall">
            منصتك التعليمية — تابع كورساتك وتقدّم في مسيرتك من مكان واحد
          </Text>
        </Box>
      </Box>

      <div  className="m-auto">
       <MyCourses/>
      </div>
      <TeacherDetails />

      <ScrollToTop />
    </div>
  );
};

export default LoginHome;
