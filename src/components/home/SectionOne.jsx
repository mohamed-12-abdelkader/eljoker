import React, { useState, useEffect } from "react";
import { Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import UserType from "../../Hooks/auth/userType";
import img from "../../img/2f2e8bcb-1449-42f4-9a19-ac4a67628a79.jpeg";

const SectionOne = () => {
  const [userData, isAdmin, isTeacher, student] = UserType();
  const [displayedName, setDisplayedName] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const name = "Mr. Ahmed Hisham Abbas 😇 The Joker in English 🃏";
  const description = "استمتع بدروس الثانوية العامة على دعم تعليمي";

  const messages = [
    "نقدم لك دعم تعليمى متميز ",
    "محاضرات باعلى جودة ",
    "منصة ثابتة وسريعة ",
    "امتحانات دورية مستمرة ",
  ];

  useEffect(() => {
    if (nameIndex < name.length) {
      const timer = setTimeout(() => {
        setDisplayedName(name.slice(0, nameIndex + 1));
        setNameIndex(nameIndex + 1);
      }, 100); // تحديد معدل السرعة بالميلي ثانية
      return () => clearTimeout(timer);
    }
  }, [name, nameIndex]);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // تغيير الجملة كل 2 ثانية
    return () => clearInterval(messageTimer);
  }, []);

  return (
    <div className=" - relative overflow-hidden mt-[80px]">
      {/* النقاط الخلفية */}
      <img src={img} />
    </div>
  );
};

export default SectionOne;
