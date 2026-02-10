import React, { useMemo } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  useColorModeValue,
  Divider,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaGraduationCap } from "react-icons/fa";
import ScrollToTop from "../../components/scollToTop/ScrollToTop";

const getDisplayName = (user) => {
  if (!user) return "";
  if (user.name) return user.name;
  const f = user.fname || "";
  const l = user.lname || "";
  return `${f} ${l}`.trim() || "—";
};

const getDisplayEmail = (user) => {
  if (!user) return "—";
  return user.email || user.mail || "—";
};

const getDisplayPhone = (user) => {
  if (!user) return "—";
  return user.phone || "—";
};

const getGradeLabel = (grad) => {
  if (grad == null || grad === undefined) return "—";
  if (grad === 1) return "الصف الأول الثانوي";
  if (grad === 2) return "الصف الثاني الثانوي";
  if (grad === 3) return "الصف الثالث الثانوي";
  return "—";
};

const Profile = () => {
  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const valueColor = useColorModeValue("gray.800", "gray.100");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const avatarBg = useColorModeValue("blue.100", "blue.700");
  const headerGradient = useColorModeValue(
    "linear(to-br, blue.500, blue.600)",
    "linear(to-br, blue.600, blue.700)"
  );

  const displayName = getDisplayName(user);
  const displayEmail = getDisplayEmail(user);
  const displayPhone = getDisplayPhone(user);
  const gradeLabel = getGradeLabel(user?.grad);

  const rows = [
    { label: "الاسم", value: displayName, icon: IoPersonCircleSharp },
    { label: "البريد الإلكتروني", value: displayEmail, icon: MdEmail },
    { label: "رقم الهاتف", value: displayPhone, icon: FaPhone },
    { label: "الصف الدراسي", value: gradeLabel, icon: FaGraduationCap },
  ];

  return (
    <Box minH="100vh" bg={bg} dir="rtl" pt={{ base: "100px", md: "120px" }} pb="120px">
      <Container maxW="lg" px={4}>
        <Box
          bg={cardBg}
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          {/* الهيدر */}
          <Box bgGradient={headerGradient} py={8} px={6}>
            <VStack spacing={4}>
              {user?.avatar ? (
                <Avatar
                  size="2xl"
                  name={displayName}
                  src={user.avatar}
                  borderWidth="4px"
                  borderColor="white"
                  boxShadow="lg"
                />
              ) : (
                <Box
                  w="20"
                  h="20"
                  borderRadius="full"
                  bg="whiteAlpha.300"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={IoPersonCircleSharp} boxSize={12} color="white" />
                </Box>
              )}
              <Heading size="md" color="white" noOfLines={1}>
                الملف الشخصي
              </Heading>
            </VStack>
          </Box>

          {/* المحتوى */}
          <Box p={6}>
            {user ? (
              <VStack spacing={0} align="stretch" divider={<Divider borderColor={borderColor} />}>
                {rows.map((row) => (
                  <HStack
                    key={row.label}
                    py={4}
                    justify="space-between"
                    align="flex-start"
                    spacing={4}
                  >
                    <HStack spacing={3} flex="1" minW={0}>
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg={avatarBg}
                        color="blue.600"
                        _dark={{ color: "blue.200" }}
                      >
                        <Icon as={row.icon} boxSize={5} />
                      </Box>
                      <VStack align="flex-start" spacing={0} flex="1" minW={0}>
                        <Text fontSize="sm" color={labelColor} fontWeight="500">
                          {row.label}
                        </Text>
                        <Text fontSize="md" fontWeight="600" color={valueColor} noOfLines={1}>
                          {row.value}
                        </Text>
                      </VStack>
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            ) : (
              <Box py={12} textAlign="center">
                <Icon as={IoPersonCircleSharp} boxSize={16} color={labelColor} opacity={0.5} mb={4} />
                <Text fontWeight="600" color={headingColor} fontSize="lg">
                  لا يتوفر بيانات حالياً
                </Text>
                <Text fontSize="sm" color={labelColor} mt={2}>
                  سجّل الدخول لعرض ملفك الشخصي
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      <ScrollToTop />
    </Box>
  );
};

export default Profile;
