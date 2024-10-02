import SectionOne from "../../components/home/SectionOne";
import SectionTwo from "../../components/home/SectionTwo";
import SectionThree from "../../components/home/SectionThree";
import SectionFour from "../../components/home/SectionFour";
import AllTeacher from "../../components/teacher/AllTeacher";
import UserType from "../../Hooks/auth/userType";
import LoginHome from "../../components/home/LoginHome";
import ScrollToTop from "../../components/scollToTop/ScrollToTop";
import Subject from "../../components/subject/Subject";

const Home = () => {
  const [userData, isAdmin, isTeacher, student] = UserType();
  return (
    <div>
      <SectionOne />
      {student ? (
        <div>
          <LoginHome />
        </div>
      ) : (
        <div>
          {" "}
          <SectionTwo />
          <SectionFour />
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default Home;
