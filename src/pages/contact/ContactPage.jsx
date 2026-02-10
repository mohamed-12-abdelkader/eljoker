import React from "react";
import { Box, Container, Heading, Text, VStack, HStack, Button, useColorModeValue, Icon } from "@chakra-ui/react";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdPhone, MdSupport } from "react-icons/md";

const SOCIAL = [
  {
    name: "فيسبوك",
    href: "https://www.facebook.com/profile.php?id=100083279661430",
    icon: FaFacebookSquare,
    color: "#1877F2",
  },
  {
    name: "يوتيوب",
    href: "https://youtube.com/@mustafanofal1695?si=6jdZryxIfeCBYgxz",
    icon: FaYoutube,
    color: "#FF0000",
  },
];

const SUPPORT = [
  { label: "دعم فني", number: "01111272393", icon: MdSupport },
  { label: "دعم علمي", number: "01550470102", icon: MdPhone },
];

const ContactPage = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subColor = useColorModeValue("gray.600", "gray.400");
  const socialCardBg = useColorModeValue("gray.100", "gray.700");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  const openWhatsApp = (phone) => {
    const num = phone.replace(/^0/, "20");
    window.open(`https://wa.me/${num}`, "_blank");
  };

  return (
    <Box minH="100vh" bg={bg} dir="rtl" pt={{ base: "80px", md: "100px" }} pb="120px">
      <Container maxW="md" px={4}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={2}>
            <Heading size="lg" color={textColor} mb={2}>
              التواصل معنا
            </Heading>
            <Text color={subColor} fontSize="md">
              تواصل معنا عبر السوشيال ميديا أو واتساب
            </Text>
          </Box>

          {/* روابط السوشيال */}
          <Box bg={cardBg} borderRadius="2xl" p={6} boxShadow="md" borderWidth="1px" borderColor={cardBorder}>
            <Text fontWeight="600" color={textColor} mb={4} fontSize="lg">
              حساباتنا على السوشيال
            </Text>
            <HStack spacing={4} justify="center" flexWrap="wrap">
              {SOCIAL.map((item) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl min-w-[100px] transition-all hover:scale-105"
                    style={{ backgroundColor: socialCardBg }}
                  >
                    <IconComp className="text-4xl" style={{ color: item.color }} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                  </a>
                );
              })}
            </HStack>
          </Box>

          {/* أزرار واتساب */}
          <Box bg={cardBg} borderRadius="2xl" p={6} boxShadow="md" borderWidth="1px" borderColor={cardBorder}>
            <Text fontWeight="600" color={textColor} mb={4} fontSize="lg">
              واتساب
            </Text>
            <VStack spacing={4} align="stretch">
              {SUPPORT.map((item) => (
                <Button
                  key={item.label}
                  size="lg"
                  rightIcon={<IoLogoWhatsapp className="text-2xl" />}
                  colorScheme="green"
                  variant="solid"
                  onClick={() => openWhatsApp(item.number)}
                  justifyContent="space-between"
                  py={6}
                  borderRadius="xl"
                  fontFamily="inherit"
                  dir="rtl"
                >
                  <HStack spacing={3} flex="1" justify="space-between">
                    <HStack spacing={2}>
                      <Icon as={item.icon} boxSize={5} />
                      <span>{item.label}</span>
                    </HStack>
                    <Text fontSize="sm" opacity={0.9}>
                      {item.number}
                    </Text>
                  </HStack>
                </Button>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactPage;
