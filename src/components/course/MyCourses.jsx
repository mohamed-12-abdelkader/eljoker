import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Icon,
  Button,
  Spinner,
  Center,
  useColorModeValue,
  Image,
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaQrcode,
  FaPlay,
  FaCheckCircle,
  FaCamera,
  FaGraduationCap,
  FaChevronUp,
  FaChevronDown,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import baseUrl from '../../api/baseUrl';
import { motion } from 'framer-motion';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [qrScanner, setQrScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [activationResult, setActivationResult] = useState(null);
  const [expandedCards, setExpandedCards] = useState({}); 
    const buttonColorScheme = useColorModeValue("blue", "teal");
  const authHeader = useMemo(() => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  }), []);
  const toggleDescription = (courseId) => {
    setExpandedCards(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardHoverBorder = useColorModeValue('blue.300', 'blue.500');
  const cardGradient = useColorModeValue('linear(to-br, white, gray.50)', 'linear(to-br, gray.800, gray.700)');
  const buttonGradient = useColorModeValue('linear(to-r, blue.500, blue.600)', 'linear(to-r, teal.500, teal.600)');
  const buttonHoverGradient = useColorModeValue('linear(to-r, blue.600, blue.700)', 'linear(to-r, teal.600, teal.700)');

  // Fetch courses from API
  // الاستجابة: { items: [...], courses_count, general_courses_count, packages_count, total }
  // كل عنصر في items: id, title, price, description, teacher_id, avatar, grade_id, created_at, type
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await baseUrl.get('api/course/my-enrollments', {
        headers: authHeader,
      });

      const data = response?.data;
      const rawItems = data?.items ?? data?.data?.items ?? data?.courses;
      const list = Array.isArray(rawItems) ? rawItems : [];

      const normalized = list.map((item) => ({
        id: item.id,
        title: item.title ?? '',
        price: item.price != null ? String(item.price) : '',
        description: item.description ?? '',
        teacher_id: item.teacher_id,
        avatar: item.avatar ?? '',
        grade_id: item.grade_id,
        created_at: item.created_at ?? null,
        type: item.type ?? 'course',
      }));

      setCourses(normalized);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('حدث خطأ في تحميل الكورسات');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [authHeader]);

  // دالة تفعيل الكورس من خلال QR Code
  const activateCourseWithQR = async (qrData) => {
    try {
      const response = await baseUrl.post('api/course/scan-qr-activate', {
        qr_data: qrData
      }, {
        headers: authHeader
      });
      
      if (response.data.success) {
        setActivationResult({
          success: true,
          message: response.data.message || 'تم تفعيل الكورس بنجاح!',
          courseName: response.data.course_name || 'الكورس الجديد'
        });
        setShowSuccessModal(true);
        setIsQrScannerOpen(false);
        // إعادة تحميل البيانات بعد 2 ثوان
        setTimeout(() => {
          fetchCourses();
        }, 2000);
      }
    } catch (error) {
      console.error('خطأ في تفعيل الكورس:', error);
      
      let errorMessage = error.response?.data?.message || 'حدث خطأ في تفعيل الكورس';
      let errorReason = error.response?.data?.reason || 'يرجى المحاولة مرة أخرى';
      
      if (errorMessage.includes('Activation code has been fully used') || 
          errorMessage.includes('fully used') ||
          errorMessage.includes('مستخدم من قبل')) {
        errorMessage = 'هذا الكود مستخدم من قبل';
        errorReason = 'تم استخدام كود التفعيل هذا مسبقاً. يرجى استخدام كود جديد أو التواصل مع الدعم الفني.';
      }
      
      setActivationResult({
        success: false,
        message: errorMessage,
        reason: errorReason
      });
      setShowErrorModal(true);
      setIsQrScannerOpen(false);
    }
  };

  // دالة بدء QR Scanner
  const startQrScanner = async () => {
    setIsScanning(true);
    
    try {
      const element = document.getElementById("qr-reader");
      if (!element) {
        console.error("QR reader element not found");
        setIsScanning(false);
        return;
      }

      const html5Qrcode = new Html5Qrcode("qr-reader");
      
      try {
        await html5Qrcode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText, decodedResult) => {
            console.log("QR Code scanned:", decodedText);
            setIsScanning(false);
            html5Qrcode.stop().then(() => {
              html5Qrcode.clear();
              setQrScanner(null);
              setIsQrScannerOpen(false);
              activateCourseWithQR(decodedText);
            }).catch(() => {
              html5Qrcode.clear();
              setQrScanner(null);
              setIsQrScannerOpen(false);
              activateCourseWithQR(decodedText);
            });
          },
          (errorMessage) => {
            // خطأ في القراءة - لا نعرضه للمستخدم
          }
        ).catch((err) => {
          console.error("Error starting camera:", err);
          setIsScanning(false);
        });
        
        setQrScanner(html5Qrcode);
      } catch (err) {
        console.error("Camera permission error:", err);
        setIsScanning(false);
      }
    } catch (error) {
      console.error("Error starting scanner:", error);
      setIsScanning(false);
    }
  };

  // دالة بدء الـ Modal وفتح الكاميرا
  const openQrScannerModal = () => {
    setIsQrScannerOpen(true);
  };

  // دالة إغلاق QR Scanner
  const closeQrScanner = async () => {
    setIsScanning(false);
    
    if (qrScanner) {
      try {
        const state = await qrScanner.getState();
        if (state === 2) {
          await qrScanner.stop();
        }
        qrScanner.clear();
        setQrScanner(null);
      } catch (error) {
        console.error("Error clearing scanner:", error);
        try {
          qrScanner.clear();
        } catch (e) {}
        setQrScanner(null);
      }
    }
    
    setIsQrScannerOpen(false);
  };

  // بدء Scanner عندما يفتح الـ Modal
  useEffect(() => {
    if (isQrScannerOpen && !qrScanner) {
      const timer = setTimeout(() => {
        startQrScanner();
      }, 500);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQrScannerOpen]);

  // تنظيف Scanner عند إغلاق الـ Modal
  useEffect(() => {
    if (!isQrScannerOpen && qrScanner) {
      closeQrScanner();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQrScannerOpen]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('ar-EG', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <Center py={20}>
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Text color={subTextColor}>جاري تحميل الكورسات...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center py={20}>
        <VStack spacing={4}>
          <Icon as={FaBookOpen} boxSize={12} color="red.500" />
          <Text color="red.500" fontSize="lg" fontWeight="bold">{error}</Text>
          <Button onClick={fetchCourses} colorScheme="blue">
            إعادة المحاولة
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Box w="100%" py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }} dir="rtl">
      {/* Header */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'stretch', md: 'center' }}
        mb={6}
        gap={4}
      >
        <VStack align={{ base: 'flex-start', md: 'flex-start' }} spacing={1}>
          <Heading size={{ base: 'lg', md: 'xl' }} color={textColor} fontWeight="700">
            كورساتي
            {courses.length > 0 && (
              <Text as="span" color={subTextColor} fontWeight="500" fontSize="md" mr={2}>
                ({courses.length})
              </Text>
            )}
          </Heading>
          <Text color={subTextColor} fontSize="sm">
            الكورسات المشترك بها
          </Text>
        </VStack>

        <Button
          onClick={openQrScannerModal}
          leftIcon={<Icon as={FaQrcode} boxSize={5} />}
          bgGradient="linear(to-r, blue.500, blue.600)"
          color="white"
          borderRadius="xl"
          px={5}
          py={6}
          _hover={{
            bgGradient: 'linear(to-r, blue.600, blue.700)',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
          fontWeight="bold"
          fontSize="md"
        >
          تفعيل كورس (QR)
        </Button>
      </Flex>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          spacing={6}
          w="full"
        >
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/CourseDetailsPage/${course.id}`}
              style={{ textDecoration: 'none' }}
              _hover={{ outline: 'none' }}
            >
              <Card
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="2xl"
                overflow="hidden"
                shadow="md"
                _hover={{
                  shadow: 'xl',
                  transform: 'translateY(-4px)',
                  borderColor: cardHoverBorder,
                }}
                transition="all 0.3s ease"
                display="flex"
                flexDirection="column"
                h="full"
                bgGradient={cardGradient}
                role="group"
                cursor="pointer"
              >
                <Box position="relative" overflow="hidden">
                  <AspectRatio ratio={16 / 9} w="100%">
                    <Image
                      src={course.avatar || ''}
                      alt={course.title || 'كورس'}
                      objectFit="cover"
                      transition="transform 0.3s ease"
                      _groupHover={{ transform: 'scale(1.05)' }}
                      fallbackSrc="https://via.placeholder.com/400x225/4A90E2/FFFFFF?text=Course"
                    />
                  </AspectRatio>
                    {/* Gradient overlay */}
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      height="50%"
                      bgGradient="linear(to-t, blackAlpha.600, transparent)"
                      opacity="0"
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.3s ease"
                    />
                    {/* Overlay with play button */}
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      bg="blackAlpha.400"
                      opacity="0"
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.3s ease"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        as={FaPlay}
                        boxSize={12}
                        color="white"
                        filter="drop-shadow(0 0 8px rgba(0,0,0,0.5))"
                      />
                    </Box>
                    {/* Course status badge */}
                 
                  </Box>
                  <CardBody p={{ base: 4, sm: 5, md: 6 }} display="flex" flexDirection="column" flex="1">
                    <VStack align="flex-end" spacing={4} w="full" h="100%" justify="space-between">
                      {/* Course Title */}
                      <Box w="full">
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: "lg", sm: "xl", md: "xl" }}
                          color={textColor}
                          textAlign="right"
                          noOfLines={2}
                          lineHeight="shorter"
                          mb={2}
                        >
                          {course.title}
                        </Text>
                        {/* Course Description */}
                        {course.description ? (
                          <Box w="full">
                            <Text
                              fontSize={{ base: "sm", sm: "md" }}
                              color={subTextColor}
                              textAlign="right"
                              lineHeight="tall"
                              noOfLines={expandedCards[course.id] ? undefined : 2}
                            >
                              {course.description}
                            </Text>
                            {String(course.description).length > 50 ? (
                              <HStack
                                spacing={1}
                                mt={2}
                                justify="flex-end"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleDescription(course.id);
                                }}
                                cursor="pointer"
                                _hover={{ opacity: 0.8 }}
                                transition="opacity 0.2s ease"
                              >
                                <Text color="blue.500" fontSize="xs" fontWeight="bold">
                                  {expandedCards[course.id] ? "عرض أقل" : "عرض المزيد"}
                                </Text>
                                <Icon
                                  as={expandedCards[course.id] ? FaChevronUp : FaChevronDown}
                                  color="blue.500"
                                  boxSize={3}
                                />
                              </HStack>
                            ) : null}
                          </Box>
                        ) : null}
                      </Box>

                      {/* Price and Date */}
                      <HStack justify="space-between" w="full" flexWrap="wrap" gap={2}>
                        <Badge
                          colorScheme="green"
                          borderRadius="full"
                          px={3}
                          py={1.5}
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {course.price != null ? `${Number(course.price)} جنيه` : '—'} 💰
                        </Badge>
                        <HStack spacing={1} color={subTextColor} fontSize="sm">
                          <Icon as={FaCalendarAlt} boxSize={4} />
                          <Text>
                            {course.created_at
                              ? formatDate(course.created_at)
                              : '—'}
                          </Text>
                        </HStack>
                      </HStack>

                      {/* Action Button */}
                      <Button
                        w="full"
                        size="md"
                        rightIcon={<FaPlay />}
                        borderRadius="xl"
                        fontSize="md"
                        fontWeight="bold"
                        bgGradient={buttonGradient}
                        color="white"
                        _hover={{
                          bgGradient: buttonHoverGradient,
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        _active={{ transform: 'translateY(0)' }}
                        transition="all 0.2s"
                        boxShadow="md"
                      >
                        دخول الكورس
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </Link>
          ))}
        </SimpleGrid>
      ) : (
        <Center py={20}>
          <VStack spacing={6}>
            <Box
              w={{ base: '120px', md: '160px' }}
              h={{ base: '120px', md: '160px' }}
              borderRadius="full"
              bgGradient="linear(135deg, blue.400, blue.600)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="xl"
            >
              <Icon as={FaBookOpen} boxSize={{ base: '60px', md: '80px' }} color="white" />
            </Box>
            <VStack spacing={3}>
              <Heading size="lg" color={textColor}>
                لا توجد كورسات مشترك بها
              </Heading>
              <Text color={subTextColor} textAlign="center" maxW="400px" fontSize={{ base: 'sm', md: 'md' }}>
                ابدأ رحلتك التعليمية الآن! قم بمسح QR Code لتفعيل كورس جديد
              </Text>
              <Box
                as="button"
                onClick={openQrScannerModal}
                bgGradient="linear(to-r, blue.500, blue.600)"
                color="white"
                borderRadius="2xl"
                px={8}
                py={5}
                boxShadow="xl"
                _hover={{
                  bgGradient: 'linear(to-r, blue.600, blue.700)',
                  transform: 'translateY(-3px)',
                  shadow: '2xl',
                }}
                transition="all 0.3s"
                border="2px solid"
                borderColor="blue.400"
                position="relative"
                overflow="hidden"
                mt={4}
              >
                {/* Background Animation */}
                <Box
                  position="absolute"
                  top="0"
                  left="-100%"
                  w="100%"
                  h="100%"
                  bgGradient="linear(to-r, transparent, rgba(255,255,255,0.2), transparent)"
                  transition="left 0.5s"
                  _hover={{ left: '100%' }}
                />
                
                <HStack spacing={4} position="relative" zIndex={1}>
                  <Box
                    bg="whiteAlpha.200"
                    borderRadius="lg"
                    p={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FaCamera} boxSize={6} />
                  </Box>
                  <VStack align="flex-start" spacing={1}>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      lineHeight="shorter"
                    >
                      📱 امسح QR Code الآن
                    </Text>
                    <Text
                      fontSize="sm"
                      opacity={0.9}
                      fontWeight="medium"
                    >
                      لتفعيل كورس جديد وبدء التعلم
                    </Text>
                  </VStack>
                  <Icon as={FaQrcode} boxSize={7} opacity={0.8} />
                </HStack>
              </Box>
            </VStack>
          </VStack>
        </Center>
      )}

      {/* QR Scanner Modal */}
      <Modal
        isOpen={isQrScannerOpen}
        onClose={closeQrScanner}
        isCentered
        size="xl"
        closeOnOverlayClick={false}
        closeOnEsc={true}
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent mx={4} borderRadius="2xl" overflow="hidden">
          <ModalHeader textAlign="center" bg="blue.50" py={6}>
            <VStack spacing={3}>
              <Box
                w="60px"
                h="60px"
                bgGradient="linear(135deg, blue.500, blue.600)"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaQrcode} w="30px" h="30px" color="white" />
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="blue.800">
                📱 امسح QR Code لتفعيل كورس جديد
              </Text>
              <Text fontSize="md" color="blue.600" fontWeight="medium">
                وجه الكاميرا نحو الكود المربع (QR Code) وسيتم التفعيل تلقائياً
              </Text>
            </VStack>
          </ModalHeader>

          <ModalBody py={8}>
            <VStack spacing={4} textAlign="center">
              <Box
                position="relative"
                w="100%"
                h="400px"
                borderRadius="lg"
                overflow="hidden"
                border="2px solid"
                borderColor="blue.200"
                bg="gray.100"
              >
                <div
                  id="qr-reader"
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                />

                {isScanning && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="0"
                    right="0"
                    height="3px"
                    bgGradient="linear(to-r, transparent, blue.500, transparent)"
                    transform="translateY(-50%)"
                    animation="scanning 2s linear infinite"
                    sx={{
                      '@keyframes scanning': {
                        '0%': { transform: 'translateY(-50%) translateX(-100%)' },
                        '100%': { transform: 'translateY(-50%) translateX(100%)' },
                      },
                    }}
                    zIndex={10}
                    pointerEvents="none"
                  />
                )}

                {isScanning && (
                  <Box
                    position="absolute"
                    bottom="20px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="blackAlpha.700"
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="bold"
                    zIndex={10}
                    pointerEvents="none"
                  >
                    🔍 جاري المسح...
                  </Box>
                )}
              </Box>

              <Box
                bgGradient="linear(to-r, blue.50, blue.100)"
                borderRadius="xl"
                p={5}
                border="2px solid"
                borderColor="blue.300"
                w="full"
                boxShadow="md"
              >
                <HStack spacing={3} mb={3}>
                  <Box
                    bg="blue.500"
                    borderRadius="full"
                    p={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FaCamera} color="white" boxSize={5} />
                  </Box>
                  <Text fontSize="lg" color="blue.800" fontWeight="bold">
                    📱 كيف تمسح QR Code؟
                  </Text>
                </HStack>
                <VStack align="flex-start" spacing={2}>
                  <HStack spacing={2} align="flex-start">
                    <Text fontSize="lg" color="blue.600" fontWeight="bold">1️⃣</Text>
                    <Text fontSize="md" color="blue.700" fontWeight="medium">
                      امنح الإذن لاستخدام الكاميرا عند الطلب
                    </Text>
                  </HStack>
                  <HStack spacing={2} align="flex-start">
                    <Text fontSize="lg" color="blue.600" fontWeight="bold">2️⃣</Text>
                    <Text fontSize="md" color="blue.700" fontWeight="medium">
                      وجه الكاميرا نحو QR Code (الكود المربع)
                    </Text>
                  </HStack>
                  <HStack spacing={2} align="flex-start">
                    <Text fontSize="lg" color="blue.600" fontWeight="bold">3️⃣</Text>
                    <Text fontSize="md" color="blue.700" fontWeight="medium">
                      سيتم قراءة الكود تلقائياً وتفعيل الكورس! 🎉
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="center" py={6}>
            <Button
              onClick={closeQrScanner}
              bg="gray.500"
              color="white"
              _hover={{ bg: 'gray.600' }}
              borderRadius="xl"
              px={8}
            >
              إلغاء
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent mx={4} borderRadius="2xl" overflow="hidden">
          <ModalHeader textAlign="center" bg="green.50" py={6}>
            <VStack spacing={3}>
              <Box
                w="60px"
                h="60px"
                bgGradient="linear(135deg, green.500, green.600)"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaCheckCircle} w="30px" h="30px" color="white" />
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="green.800">
                تم تفعيل الكورس بنجاح! 🎉
              </Text>
            </VStack>
          </ModalHeader>

          <ModalBody py={8}>
            <VStack spacing={4} textAlign="center">
              <Text fontSize="lg" color="green.600" fontWeight="medium">
                {activationResult?.courseName}
              </Text>
              <Text fontSize="md" color="gray.600">
                {activationResult?.message}
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="center" py={6}>
            <Button
              onClick={() => setShowSuccessModal(false)}
              bgGradient="linear(135deg, green.500, green.600)"
              color="white"
              _hover={{
                bgGradient: 'linear(135deg, green.600, green.700)',
                boxShadow: 'xl',
              }}
              borderRadius="xl"
              px={8}
            >
              متابعة
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent mx={4} borderRadius="2xl" overflow="hidden">
          <ModalHeader textAlign="center" bg="red.50" py={6}>
            <VStack spacing={3}>
              <Box
                w="60px"
                h="60px"
                bgGradient="linear(135deg, red.500, red.600)"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaQrcode} w="30px" h="30px" color="white" />
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="red.800">
                {activationResult?.message?.includes('مستخدم من قبل')
                  ? 'الكود مستخدم من قبل'
                  : 'لم يتم تفعيل الكورس'}
              </Text>
            </VStack>
          </ModalHeader>

          <ModalBody py={8}>
            <VStack spacing={4} textAlign="center">
              <Text fontSize="lg" color="red.600" fontWeight="medium">
                {activationResult?.message}
              </Text>

              <Box
                bg="red.50"
                borderRadius="lg"
                p={4}
                border="1px solid"
                borderColor="red.200"
                w="full"
              >
                <Text fontSize="sm" color="red.700" fontWeight="medium" mb={2}>
                  🔍 السبب:
                </Text>
                <Text fontSize="sm" color="red.600">
                  {activationResult?.reason}
                </Text>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="center" py={6}>
            <Button
              onClick={() => setShowErrorModal(false)}
              bg="gray.500"
              color="white"
              _hover={{ bg: 'gray.600' }}
              borderRadius="xl"
              px={8}
            >
              إغلاق
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyCourses;
