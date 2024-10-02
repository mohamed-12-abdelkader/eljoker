import React, { useEffect, useState } from "react";
import baseUrl from "../../api/baseUrl";

const useGitFreeCourses = () => {
  const token = localStorage.getItem("token");
  const [freeMonth, setMyLecture] = useState("");
  const [freeMonthLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await baseUrl.get("api/month/free", {
          headers: { token: token },
        });
        setMyLecture(response.data);
      } catch (error) {
        console.log("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return [freeMonth, freeMonthLoading];
};

export default useGitFreeCourses;
