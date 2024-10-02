import ScrollToTop from "../../components/scollToTop/ScrollToTop";
import Lectures from "../../components/lecture/Lectures";

const MyLecture = () => {
  return (
    <div className="mt-[150px] mb-[50px]" style={{ minHeight: "60vh" }}>
      <div className="w-[90%] m-auto border shadow ">
        <Lectures />
      </div>
      <ScrollToTop />
    </div>
  );
};

export default MyLecture;
