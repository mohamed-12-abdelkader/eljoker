import GitTeacherByToken from "../../Hooks/student/GitTeacherByToken";
import { Card, CardBody, Skeleton, Stack } from "@chakra-ui/react";
import { FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import ScrollToTop from "../scollToTop/ScrollToTop";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Lectures from "../../components/lecture/Lectures";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import SectionTwo from "./SectionTwo";
import AllTeacherLogin from "../teacher/AllTeacherLogin";
import FreeCourses from "./FreeCourses";
import TeacherDetails from "../../pages/teacher/TeacherDetails";

const LoginHome = () => {
  return (
    <div className="mt-[50px]">
      <div dir="ltr" className="m-auto">
        <Lectures />
      </div>
      <TeacherDetails />

      <ScrollToTop />
    </div>
  );
};

export default LoginHome;
