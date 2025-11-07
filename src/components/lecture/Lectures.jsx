import { Button, Card, CardBody, Skeleton, Stack, Badge, Box } from "@chakra-ui/react";
import { MdOutlineVideoLibrary, MdCancelPresentation, MdAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";
import GitMyMonthes from "../../Hooks/student/GitMyMonthes";

const Lectures = () => {
  const [myMonth, myMonthLoading] = GitMyMonthes();
  const allCourses = myMonth?.courses || [];
  const courses = allCourses.filter((course) => course.teacher_id === 1753);
  
  return (
    <div dir="rtl" className="  py-8 px-4 md:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <MdOutlineVideoLibrary className="text-white text-3xl" />
          </div>
          <h1 className="font-bold text-4xl md:text-5xl text-blue-500">
            كورساتي
          </h1>
        </div>
      
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto">
        {myMonthLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="overflow-hidden shadow-lg">
                <Skeleton height="200px" />
                <CardBody>
                  <Stack spacing={3}>
                    <Skeleton height="20px" width="80%" />
                    <Skeleton height="20px" width="60%" />
                    <Skeleton height="40px" />
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((lectre) => (
              <Card
                key={lectre.id}
                className="group mx-auto overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white"
                style={{ borderRadius: "16px" }}
              >
                {/* Image Container with Overlay */}
                <Box position="relative" overflow="hidden" className="h-[220px]">
                  <img
                    src={lectre.avatar || "https://via.placeholder.com/400x300?text=Course+Image"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    alt={lectre.title || "Course"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badge Overlay */}
              

                  {/* Price Badge */}
                  {lectre.price && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                      <MdAttachMoney className="text-green-600 text-lg" />
                      <span className="font-bold text-green-700">{lectre.price}</span>
                    </div>
                  )}
                </Box>

                <CardBody className="p-5">
                  {/* Title */}
                  <h2 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[56px] group-hover:text-blue-600 transition-colors duration-200">
                    {lectre.title || lectre.description}
                  </h2>
                  
                  {/* Description */}
                  {lectre.title && lectre.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {lectre.description}
                    </p>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

                  {/* Button */}
                  <Link to={`/CourseDetailsPage/${lectre.id}`} className="block">
                    <Button
                      colorScheme="blue"
                      className="w-full font-semibold py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-xl transition-all duration-200"
                      style={{ borderRadius: "10px" }}
                    >
                      دخول للكورس
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[70vh] py-12">
            <div className="relative w-full max-w-3xl">
              {/* Background Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-pink-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
              
              <Card 
                className="relative shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-lg"
                style={{ borderRadius: "32px" }}
              >
                <CardBody className="text-center py-16 md:py-24 px-8 md:px-16">
                  <div className="flex flex-col items-center gap-8">
                    {/* Icon Container with Enhanced Animation */}
                    <div className="relative group">
                      {/* Outer Glow Ring */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500 animate-pulse"></div>
                      {/* Middle Ring */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-30 blur-md"></div>
                      {/* Icon Container */}
                      <div className="relative p-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-full shadow-2xl border-4 border-white/50 transform group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full"></div>
                        <MdCancelPresentation className="relative text-8xl md:text-9xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent" />
                      </div>
                    </div>
                    
                    {/* Title Section */}
                    <div className="space-y-4">
                      <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-gray-800">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                          لا توجد كورسات
                        </span>
                      </h2>
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <div className="w-24 h-1 bg-gradient-to-l from-transparent via-purple-500 to-pink-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Description Section */}
                    <div className="space-y-4 max-w-lg">
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                        <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed mb-3">
                          أنت لست مشتركًا في أي كورسات حالياً
                        </p>
                        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                          ابدأ رحلتك التعليمية اليوم واشترك في كورساتنا المميزة لتطوير مهاراتك
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative Elements with Animation */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                      <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0s', animationDuration: '1.5s' }}></div>
                      <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
                      <div className="w-3 h-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
                    </div>
                    
                    {/* Additional Decorative Circles */}
                    <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-blue-200/40 to-transparent rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-purple-200/40 to-transparent rounded-full blur-xl"></div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lectures;
