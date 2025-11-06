import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Badge,
  Box,
  useToast,
} from "@chakra-ui/react";
import { MdCancelPresentation, MdOutlineVideoLibrary, MdAttachMoney } from "react-icons/md";
import PurchaseAlert from "../../ui/modal/PurchaseAlert";
import GitTeacherDetails from "../../Hooks/teacher/GitTeacherDetails";
import ScrollToTop from "../../components/scollToTop/ScrollToTop";
import baseUrl from "../../api/baseUrl";
import Loading from "../../components/loading/Loading";

const TeacherDetails = () => {
  const { id } = useParams();
  const toast = useToast();
  const [activateModal, setActivateModal] = useState({ isOpen: false, courseId: null });
  const [activationCode, setActivationCode] = useState("");
  const [activateLoading, setActivateLoading] = useState(false);
  const [teacherLoading, teacher] = GitTeacherDetails({ id: 35 });
  const [courses, setCourses] = useState([]);

  // دالة تفعيل الكورس
  const handleActivateCourse = async () => {
    setActivateLoading(true);
    try {
      await baseUrl.post(
        "/api/course/activate",
        {
          code: activationCode,
          course_id: activateModal.courseId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // تحديث حالة الكورس في البيانات المحلية
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === activateModal.courseId
            ? { ...course, is_enrolled: true }
            : course
        )
      );

      toast({
        title: "تم تفعيل الكورس بنجاح!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setActivateModal({ isOpen: false, courseId: null });
      setActivationCode("");
    } catch (error) {
      toast({
        title: "خطأ في تفعيل الكورس",
        description: error.response?.data?.message || "حدث خطأ غير متوقع",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setActivateLoading(false);
    }
  };

  // تحديث courses عند تغيير teacher
  React.useEffect(() => {
    if (teacher) {
      const coursesData = Array.isArray(teacher) ? teacher : [];
      setCourses(coursesData);
    }
  }, [teacher]);

  if (teacherLoading) {
    return <Loading />;
  }

  return (
    <div dir="rtl" className=" bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8 px-4 md:px-8 mt-[80px]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-500 rounded-xl shadow-lg">
              <MdOutlineVideoLibrary className="text-white text-3xl" />
            </div>
            <h1 className="font-bold text-4xl md:text-5xl text-blue-500">
              جميع الكورسات
            </h1>
          </div>
        </div>

        {/* Courses Section */}
        <div>
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white"
                  style={{ borderRadius: "16px" }}
                >
                  {/* Image Container with Overlay */}
                  <Box position="relative" overflow="hidden" className="h-[220px]">
                    <img
                      src={course.avatar || "https://via.placeholder.com/400x300?text=Course+Image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      alt={course.title || "Course"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Enrollment Badge */}
                    {course.is_enrolled ?(
                      <div className="absolute top-3 right-3">
                        <Badge 
                          colorScheme="green" 
                          className="px-3 py-1 text-sm font-semibold shadow-lg bg-green-500 text-white"
                          style={{ borderRadius: "12px" }}
                        >
                          مشترك
                        </Badge>
                      </div>
                    ) : (
                   
                         <div className="absolute top-3 right-3">
                        <Badge 
                          colorScheme="red" 
                          className="px-3 py-1 text-sm font-semibold shadow-lg bg-green-500 text-white"
                          style={{ borderRadius: "12px" }}
                        >
                          غير مشترك 
                        </Badge>
                      </div>

                    )}

                    {/* Price Badge */}
                    {course.price && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                        <MdAttachMoney className="text-green-600 text-lg" />
                        <span className="font-bold text-green-700">{course.price}</span>
                        <span className="text-xs text-gray-600">ج.م</span>
                      </div>
                    )}
                  </Box>

                  <CardBody className="p-5">
                    {/* Title */}
                    <h2 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[56px] group-hover:text-blue-600 transition-colors duration-200">
                      {course.title}
                    </h2>
                    
                    {/* Description */}
                    {course.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {course.description}
                      </p>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

                    {/* Button */}
                    {course.is_enrolled ? (
                      <Link to={`/CourseDetailsPage/${course.id}`} className="block">
                        <Button
                          colorScheme="blue"
                          className="w-full font-semibold py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-xl transition-all duration-200"
                          style={{ borderRadius: "10px" }}
                        >
                          دخول للكورس
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="solid"
                        colorScheme="green"
                        className="w-full font-semibold py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-xl transition-all duration-200"
                        style={{ borderRadius: "10px" }}
                        onClick={() => {
                          setActivateModal({ isOpen: true, courseId: course.id });
                        }}
                      >
                        شراء الكورس
                      </Button>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <Card 
              className="max-w-2xl mx-auto shadow-xl border-0"
              style={{ borderRadius: "20px" }}
            >
              <CardBody className="text-center py-16 px-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-orange-50 rounded-full">
                    <MdCancelPresentation className="text-6xl text-orange-500" />
                  </div>
                  <h2 className="font-bold text-2xl text-gray-800">
                    لا يوجد كورسات
                  </h2>
                  <p className="text-gray-600 text-lg">
                    لا يوجد كورسات الان سوف يتم اضافتها فى اقرب وقت ممكن
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
      <PurchaseAlert
        isOpen={activateModal.isOpen}
        onClose={() => {
          setActivateModal({ isOpen: false, courseId: null });
          setActivationCode("");
        }}
        activationCode={activationCode}
        setActivationCode={setActivationCode}
        handleActivateCourse={handleActivateCourse}
        activateLoading={activateLoading}
      />
      <ScrollToTop />
    </div>
  );
};

export default TeacherDetails;
