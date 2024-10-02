import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { Zoom } from "react-awesome-reveal";
import ScrollToTop from "../../components/scollToTop/ScrollToTop";

import GitLecturTdetails from "../../Hooks/teacher/GitLecturTdetails";
import UserType from "../../Hooks/auth/userType";
import DeleateCenterVedio from "../../Hooks/teacher/DeleateCenterVedio";
import DeleateExamG from "../../Hooks/teacher/DeleateExamG";
import DeleatPdf from "../../Hooks/teacher/DeleatPdf";
import GitLectureCenterDetails from "../../Hooks/student/GitLectureCenterDetails";
import LectureContent from "../../components/lecture/LectureContent";
import AlertDialogComponent from "../../components/lecture/AlertDialogComponent";
import Loading from "../../components/loading/Loading";

const LectureDetails = () => {
  const { id } = useParams();
  const [lectureLoading, lectures] = GitLectureCenterDetails({ id });
  const [lectureTLoading, lecturesT] = GitLecturTdetails({ id });
  const [userData, isAdmin, isTeacher] = UserType();
  const [deleteVedioCenterLoading, deletVedioCenter] = DeleateCenterVedio();
  const [deleteGLoading, deleteExamsG] = DeleateExamG();
  const [deletePdfLoading, deletPdf] = DeleatPdf();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [selectedItem, setSelectedItem] = useState(null);

  const videosToMap = lectures?.videos || lecturesT?.videos || [];
  const pdfsToMap = lectures?.pdfs || lecturesT?.pdfs || [];
  const examName = lecturesT?.exam_name || lectures?.exam_name;
  const examId = lecturesT?.exam_id || lectures?.exam_id;
  const lastResult = lectures?.last_result;

  const handleDeleteVideo = (video) => {
    setSelectedItem(video);
    onOpen();
  };

  const handleDeletePdf = (pdf) => {
    setSelectedItem(pdf);
    onOpen();
  };

  const handleDeleteExam = (exam) => {
    setSelectedItem(exam);
    onOpen();
  };

  const handleConfirmDelete = () => {
    if (selectedItem?.v_name) {
      deletVedioCenter(selectedItem.id);
    } else if (selectedItem?.pdf_name) {
      deletPdf(selectedItem.id);
    } else if (selectedItem?.exam_name) {
      deleteExamsG(selectedItem.id);
    }
  };

  if (lectureLoading || lectureTLoading) {
    return <Loading />;
  }

  console.log(lectures);
  return (
    <div className="mt-[150px] w-[90%] m-auto">
      <div className="mt-[120px]" style={{ minHeight: "80vh" }}>
        <div className="lecture_details max-w-7xl mx-auto px-4 mt-[80px] mb-[80px] h-auto  py-8 md:flex md:justify-between bg-gray-100 rounded-lg shadow-lg">
          <div className="flex justify-center items-center w-full md:[300px] mb-6 md:mb-0">
            <Zoom>
              <img
                src={lecturesT?.image || lectures?.image}
                className="rounded-lg -lg h-[300px] md:h-[400px] mx-3 object-contain" // هنا التعديل
                alt="Lecture"
              />
            </Zoom>
          </div>
          <div className="lecture_content my-5 md:w-1/2 flex flex-col justify-center items-center space-y-4">
            <Zoom className="content-item">
              <div
                style={{ minWidth: "300px" }}
                className="flex items-center  bg-yellow-500 shadow-md rounded-lg p-4 w-[100%]  "
              >
                <h1 className="text-xl font-bold text-white text-center w-full">
                  {lecturesT?.description || lectures?.description}
                </h1>
              </div>
            </Zoom>
            <Zoom className="content-item">
              <div
                style={{ minWidth: "300px" }}
                className="flex items-center  bg-red-500 shadow-md rounded-lg p-4 w-[100%] "
              >
                <h1 className="text-xl font-bold text-white text-center w-full">
                  عدد الفيديوهات: {videosToMap.length}
                </h1>
              </div>
            </Zoom>
            <Zoom className="content-item">
              <div
                style={{ minWidth: "300px" }}
                className="flex items-center  bg-green-500 shadow-md rounded-lg p-4 w-[100%] "
              >
                <h1 className="text-xl font-bold text-white text-center w-full">
                  عدد الملفات : {pdfsToMap.length}
                </h1>
              </div>
            </Zoom>
          </div>
        </div>

        <LectureContent
          Loading={deleteGLoading}
          videos={videosToMap}
          pdfs={pdfsToMap}
          isTeacher={isTeacher}
          onDeleteVideo={handleDeleteVideo}
          onDeletePdf={handleDeletePdf}
          examName={examName}
          examId={examId}
          lastResult={lastResult}
          onDeleteExam={() =>
            handleDeleteExam({ id: examId, exam_name: examName })
          }
        />

        <ScrollToTop />
      </div>

      <AlertDialogComponent
        Loading={deleteGLoading || deleteVedioCenterLoading || deletePdfLoading}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmDelete}
        selectedItem={selectedItem}
        cancelRef={cancelRef}
      />
    </div>
  );
};

export default LectureDetails;
