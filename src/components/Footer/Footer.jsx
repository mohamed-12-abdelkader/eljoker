import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdHome, MdLibraryBooks, MdPhone, MdAccountCircle, MdScience, MdEmail } from "react-icons/md";
import UserType from "../../Hooks/auth/userType";

const Footer = () => {
  const [userData, isAdmin, isTeacher, student] = UserType();
  const location = useLocation();

  // إخفاء الفوتر في صفحة teacherChat
  if (location.pathname === "/teacherChat") {
    return null;
  }

  // إذا كان المستخدم طالب، اعرض navigation footer
  if (student) {
    const navItems = [
      {
        path: "/",
        icon: MdHome,
        label: "الرئيسية",
        id: "home"
      },
 
      {
        path: "/teacherChat",
        icon: MdPhone,
        label: " التواصل ",
        id: "/teacherChat"
      },
      {
        path: "/my_lecture",
        icon: MdLibraryBooks,
        label: "كورساتي",
        id: "courses"
      },
      {
        path: "/profile",
        icon: MdAccountCircle,
        label: "حسابي",
        id: "account"
      }
    ];

    // تحديد الصفحة النشطة
    const isActive = (path) => {
      if (path === "/") {
        return location.pathname === "/";
      }
      return location.pathname.startsWith(path);
    };

    return (
      <div
        dir="rtl"
        className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 shadow-lg z-0"
      >
        <div className="max-w-full mx-auto">
          <div className="flex justify-around items-center py-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[60px]"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      active
                        ? "bg-orange-500"
                        : "bg-transparent"
                    }`}
                  >
                    <Icon
                      className={`text-xl ${
                        active ? "text-white" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      active ? "text-orange-500" : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // إذا لم يكن طالب، اعرض الفوتر المناسب لمدرس الكيمياء
  return (
    <div
      dir="rtl"
      className="bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* معلومات المدرس */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <MdScience className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold">أستاذ مصطفى نوفل</h3>
            </div>
            <p className="text-blue-100 leading-relaxed mb-4">
              معلم الكيمياء المتميز - نحول الكيمياء من مادة معقدة إلى رحلة تعليمية ممتعة وسهلة
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100083279661430"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                <FaFacebookSquare className="text-2xl text-white" />
              </a>
              <a
                href="youtube.com/@mustafanofal1695?si=6jdZryxIfeCBYgxz"
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                <FaYoutube className="text-2xl text-white" />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MdLibraryBooks className="text-2xl" />
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <MdHome className="text-lg" />
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/35"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <MdLibraryBooks className="text-lg" />
                  الكورسات المتاحة
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <MdAccountCircle className="text-lg" />
                  تسجيل الدخول
                </Link>
              </li>
            </ul>
          </div>

          {/* التواصل */}
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MdPhone className="text-2xl" />
              للتواصل
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-blue-100">
                <MdEmail className="text-xl" />
                <span>info@chemistry-teacher.com</span>
              </li>
              <li className="flex items-center gap-3 text-blue-100">
               
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/30 mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-blue-100 text-sm">
            © 2024 أستاذ مصطفى نوفل - جميع الحقوق محفوظة | منصة تعليم الكيمياء الأفضل
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
