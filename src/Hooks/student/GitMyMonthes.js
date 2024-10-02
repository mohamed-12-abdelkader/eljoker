import { useEffect, useState } from "react";
import baseUrl from "../../api/baseUrl";

const GitMyMonthes = () => {
  const token = localStorage.getItem("token");
  const [myMonth, setMyLecture] = useState("");
  const [myMonthLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await baseUrl.get("api/month/mymonthuser", {
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
  return [myMonth, myMonthLoading];
};

export default GitMyMonthes;
