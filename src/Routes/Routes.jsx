import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SingUp from "../pages/signup/SingUp";
import Admin from "../pages/Admin/Admin";
import AdminMange from "../components/admin/AdminMange";
import AdminCreateCode from "../components/admin/AdminCreateCode";
import AdminTeacherBalances from "../components/admin/AdminTeacherBalances";
import Code from "../pages/code/Code";
import CreateLecture from "../components/admin/teacher/CreateLecture";
import AddVideo from "../components/admin/teacher/AddVideo";
import Wallet from "../pages/wallet/Wallet";
import TeacherDetails from "../pages/teacher/TeacherDetails";
import MyLecture from "../pages/leacter/MyLecture";
import Profile from "../pages/profile/Profile";
import VerifyCode from "../pages/password/VerifyCode";
import ResetPassword from "../pages/password/ResetPassword";
import CreateGroup from "../components/admin/teacher/CreateGroup";
import AddStudent from "../components/admin/teacher/AddStudent";
import AddExam from "../components/admin/teacher/AddExam";
import AddQuestion from "../components/admin/teacher/AddQuestion";

import TeacherWallet from "../pages/wallet/TeacherWallet";
import MyGroups from "../pages/groups/MyGroups";
import Groups from "../pages/groups/Groups";
import GroupDetails from "../pages/groups/GroupDetails";
import AddTeacher from "../components/admin/AddTeacher";
import LecturDetails from "../pages/leacter/LecturDetails";

import Vedio from "../pages/leacter/Vedio";
import Exam from "../pages/exam/Exam";
import AllResult from "../components/admin/teacher/AllResult";
import ExamTeacher from "../pages/exam/ExamTeacher";
import StudentResult from "../components/admin/teacher/StudentResult";
import UserType from "../Hooks/auth/userType";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import ProtectedLogin from "../components/protectedRoute/ProtectedLogin";
import OpenPhone from "../components/admin/OpenPhone";
import LoginPage from "../pages/login/LoginPage";
import TeacherLogin from "../pages/login/TeacerLogin";
import AdminLogin from "../pages/login/AdminLogin";

import AddPdf from "../components/admin/teacher/AddPdf";
import AddMonth from "../components/admin/teacher/AddMonth";
import AddLectureToMonth from "../components/admin/teacher/AddLectureToMonth";
import Month from "../pages/month/Month";
import TeacherCourses from "../pages/teacherCourses/TeacherCourses";
import AllCourses from "../pages/teacherCourses/AllCourses";
import NotFound from "../components/not found/NotFound";
import CreateCode from "../components/admin/teacher/CreateCode";
import CourseDetailsPage from "../pages/course/CourseDetailsPage";
import ComprehensiveExam from "../pages/exam/ComprehensiveExam";
import TeacherChat from "../pages/chat/TeacherChatPage";

const AppRouter = () => {
  const [userData, isAdmin, isTeacher, student] = UserType();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedLogin auth={isAdmin || student || isTeacher}>
              <LoginPage />
            </ProtectedLogin>
          }
        />
        <Route
          path="/student_login"
          element={
            <ProtectedLogin auth={isAdmin || student || isTeacher}>
              <Login />
            </ProtectedLogin>
          }
        />
        <Route
          path="/teacher_login"
          element={
            <ProtectedLogin auth={isAdmin || student || isTeacher}>
              <TeacherLogin />
            </ProtectedLogin>
          }
        />
        <Route
          path="/admin_login"
          element={
            <ProtectedLogin auth={isAdmin || student || isTeacher}>
              <AdminLogin />
            </ProtectedLogin>
          }
        />
        <Route
          path="/singup"
          element={
            <ProtectedLogin auth={isAdmin || student || isTeacher}>
              <SingUp />
            </ProtectedLogin>
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route path="/verify_code" element={<VerifyCode />} />
        <Route path="/rest_pass" element={<ResetPassword />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute auth={isAdmin || isTeacher}>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route element={<ProtectedRoute auth={isAdmin} />}>
            <Route path="management" element={<AdminMange />} />
            <Route path="addteacher" element={<AddTeacher />} />
            <Route path="create_code" element={<AdminCreateCode />} />
            <Route path="cridet" element={<AdminTeacherBalances />} />
            <Route path="open_phone" element={<OpenPhone />} />
          </Route>
          <Route element={<ProtectedRoute auth={isTeacher} />}>
            <Route path="create_lecture" element={<CreateLecture />} />
            <Route path="add_video" element={<AddVideo />} />
            <Route path="add_month" element={<AddMonth />} />
            <Route path="add_lecture_month" element={<AddLectureToMonth />} />
            <Route path="create_group" element={<CreateGroup />} />
            <Route path="add_student" element={<AddStudent />} />
            <Route path="addexam" element={<AddExam />} />
            <Route path="add_pdf" element={<AddPdf />} />
            <Route path="create_codee" element={<CreateCode />} />
            <Route path="add_question" element={<AddQuestion />} />
            <Route path="result/" element={<AllResult />}>
              <Route path="all_result/:resId" element={<StudentResult />} />
            </Route>
          </Route>
        </Route>
        <Route
          path="/code"
          element={
            <ProtectedRoute auth={isAdmin}>
              <Code />
            </ProtectedRoute>
          }
        />
        <Route element={<ProtectedRoute auth={student} />}>
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/teacherChat" element={<TeacherChat />} />
          <Route path="/my_lecture" element={<MyLecture />} />
          <Route path="/teacher/:id" element={<TeacherDetails />} />
          <Route path="/exam/:examId" element={<Exam />} />
          <Route path="/ComprehensiveExam/:id" element={<ComprehensiveExam />} />
        </Route>
        <Route element={<ProtectedRoute auth={isTeacher} />}>
          <Route path="/teacher_wallet" element={<TeacherWallet />} />
          <Route path="/teacher_exam/:examId" element={<ExamTeacher />} />
          <Route path="/teacher_courses/*" element={<TeacherCourses />}>
            <Route path="courses/:id" element={<AllCourses />} />
          </Route>
          <Route path="/my_groups" element={<MyGroups />}>
            <Route path="group/:id" element={<Groups />} />
          </Route>
          <Route path="/group/:id" element={<GroupDetails />} />
        </Route>
        <Route element={<ProtectedRoute auth={isTeacher || student} />}>
          <Route path="/lecture/:id" element={<LecturDetails />}></Route>
          <Route path="/month/:id" element={<Month />}></Route>
          <Route path="/course/:id" element={<CourseDetailsPage />}></Route>
          <Route path="/CourseDetailsPage/:id" element={<CourseDetailsPage />}></Route>
          <Route path="/video/:videoId" element={<Vedio />} />
        </Route>
        {""}
      </Routes>
    </div>
  );
};

export default AppRouter;
