import { useState, useEffect } from "react";
import baseUrl from "../../api/baseUrl";

const GitTeacherDetails = ({ id }) => {
  const token = localStorage.getItem("token");
  const [teacher, setTeacher] = useState("");
  const [teacherLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await baseUrl.get(`/api/student/teacher/1753/details`, {
          headers: { Authorization: `bearer ${token}` },
        });
        setTeacher(response.data.courses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return [teacherLoading, teacher];
};

export default GitTeacherDetails;
