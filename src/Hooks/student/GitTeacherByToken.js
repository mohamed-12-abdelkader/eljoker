import baseUrl from "../../api/baseUrl";
import { useState, useEffect } from "react";
const GitTeacherByToken = () => {
  const token = localStorage.getItem("token");
  const [teachers, setTeacher] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await baseUrl.get("api/user/myteacher", {
          headers: { token: token },
        });
        setTeacher(response.data);
      } catch (error) {
        console.log("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return [loading, teachers];
};

export default GitTeacherByToken;
