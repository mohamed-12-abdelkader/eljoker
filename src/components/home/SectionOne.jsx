import React, { useState, useEffect } from "react";
import { Zoom, Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { MdScience, MdSchool, MdPlayArrow, MdStar } from "react-icons/md";

const SectionOne = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "نقدم لك شرحًا مبسطًا وممتعًا للكيمياء",
    "محاضرات عالية الجودة مع أمثلة عملية",
    "منهج شامل يغطي جميع أجزاء الكيمياء",
    "امتحانات دورية لتقييم مستواك المستمر",
  ];

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(messageTimer);
  }, []);

  return (
    <div className="relative overflow-hidden mt-[80px] min-h-[90vh] flex items-center">
      {/* Background Gradients - Softer */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30"></div>
      
      {/* Animated Background Elements - Lighter */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-cyan-200/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/10 to-pink-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Decorative Circles - Softer */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-100/20 rounded-full blur-2xl"></div>

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
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    أستاذ مصطفى نوفل
                  </span>
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <p className="text-xl md:text-2xl text-gray-600 font-medium">
                    معلم الكيمياء المتميز
                  </p>
                </div>
              </div>
            </Slide>

            <Fade direction="up" delay={200} triggerOnce>
              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                ابدأ رحلتك في عالم الكيمياء مع أفضل شرح وأوضح طريقة. 
                نحول الكيمياء من مادة معقدة إلى رحلة تعليمية ممتعة وسهلة.
              </p>
            </Fade>

            <Fade direction="up" delay={300} triggerOnce>
              {/* Rotating Messages */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                    <MdSchool className="text-white text-xl" />
                  </div>
                  <p className="text-gray-500 font-medium">ما نقدمه لك:</p>
                </div>
                <p className="text-xl font-bold text-gray-800 min-h-[32px] transition-all duration-500">
                  {messages[currentMessageIndex]}
                </p>
              </div>
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
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    100+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">محاضرة</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">طالب</div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    4.9
                  </div>
                  <MdStar className="text-yellow-400 text-2xl" />
                  <div className="text-sm text-gray-600 mt-1">تقييم</div>
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
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/15 via-cyan-200/15 to-purple-200/15 rounded-3xl blur-2xl animate-pulse"></div>
                
                {/* Image Frame */}
                <div className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50/30 rounded-3xl p-8 shadow-2xl border-4 border-white/50 transform hover:scale-105 transition-transform duration-300">
                  {/* Placeholder for Teacher Image */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                    {/* Placeholder Content */}
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-xl">
                        <MdScience className="text-white text-6xl" />
                      </div>
                      <img src="hero.jpg " className="h-[500px]"/>
                    </div>
                    
                    {/* Decorative Elements - Softer */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-blue-100/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-4 left-4 w-20 h-20 bg-cyan-100/20 rounded-full blur-xl"></div>
                  </div>
                </div>

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
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24">
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1125,75 1200,60 L1200,120 L0,120 Z"
            fill="white"
            opacity="0.8"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SectionOne;
