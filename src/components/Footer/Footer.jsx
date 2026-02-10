import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {
  MdLibraryBooks,
  MdPhone,
  MdAccountCircle,
  MdScience,
  MdEmail,
  MdAssignment,
} from "react-icons/md";
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
        path: "/exam-grades",
        icon: MdAssignment,
        label: "درجاتي",
        id: "grades",
      },
      {
        path: "/contact",
        icon: MdPhone,
        label: "التواصل",
        id: "contact",
      },
      {
        path: "/my_lecture",
        icon: MdLibraryBooks,
        label: "كورساتي",
        id: "courses",
      },
      {
        path: "/profile",
        icon: MdAccountCircle,
        label: "حسابي",
        id: "account",
      },
    ];

    // تحديد الصفحة النشطة
    const isActive = (path) => {
      if (path === "/exam-grades") {
        return location.pathname === "/exam-grades";
      }
      if (path === "/contact") {
        return location.pathname === "/contact";
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
                      active ? "bg-orange-500" : "bg-transparent"
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
    <footer dir="rtl" className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* معلومات المدرس */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 ring-1 ring-white/20">
                <MdScience className="text-2xl text-cyan-300" />
              </div>
              <h3 className="text-xl font-bold text-white">أستاذ مصطفى نوفل</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
              معلم الكيمياء المتميز — نحول الكيمياء من مادة معقدة إلى رحلة
              تعليمية ممتعة وسهلة
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=100083279661430"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-200"
                aria-label="فيسبوك"
              >
                <FaFacebookSquare className="text-xl text-white" />
              </a>
              <a
                href="https://youtube.com/@mustafanofal1695?si=6jdZryxIfeCBYgxz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-200"
                aria-label="يوتيوب"
              >
                <FaYoutube className="text-xl text-white" />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <MdLibraryBooks className="text-lg text-cyan-400" />
              روابط سريعة
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/exam-grades"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2.5 py-1 text-sm font-medium"
                >
                  <MdAssignment className="text-lg text-cyan-400/90 shrink-0" />
                  درجاتي
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/35"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2.5 py-1 text-sm font-medium"
                >
                  <MdLibraryBooks className="text-lg text-cyan-400/90 shrink-0" />
                  الكورسات المتاحة
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2.5 py-1 text-sm font-medium"
                >
                  <MdAccountCircle className="text-lg text-cyan-400/90 shrink-0" />
                  تسجيل الدخول
                </Link>
              </li>
            </ul>
          </div>

          {/* التواصل */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <MdPhone className="text-lg text-cyan-400" />
              للتواصل
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <MdEmail className="text-lg text-cyan-400/90 shrink-0" />
                <span>info@chemistry-teacher.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} أستاذ مصطفى نوفل — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
