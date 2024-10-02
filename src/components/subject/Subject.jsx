import { Card } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import img1 from "../../img/Physics Notebook Cover (1).png";
import img2 from "../../img/Physics Notebook Cover (2).png";
import img3 from "../../img/Physics Notebook Cover (3).png";
import img4 from "../../img/Physics Notebook Cover (4).png";
import img5 from "../../img/Physics Notebook Cover (5).png";
import img6 from "../../img/Physics Notebook Cover (6).png";
import img7 from "../../img/Physics Notebook Cover (7).png";
import img8 from "../../img/Physics Notebook Cover (8).png";
import img9 from "../../img/Physics Notebook Cover (9).png";
import img10 from "../../img/Physics Notebook Cover (10).png";
import img11 from "../../img/Physics Notebook Cover (11).png";
import img12 from "../../img/Physics Notebook Cover (12).png";

const Subject = () => {
  const subjects = [
    { id: Math.random(), imgYrl: img1 },
    { id: Math.random(), imgYrl: img2 },
    { id: Math.random(), imgYrl: img3 },
    { id: Math.random(), imgYrl: img4 },
    { id: Math.random(), imgYrl: img5 },
    { id: Math.random(), imgYrl: img6 },
    { id: Math.random(), imgYrl: img7 },
    { id: Math.random(), imgYrl: img8 },
    { id: Math.random(), imgYrl: img9 },
    { id: Math.random(), imgYrl: img10 },
    { id: Math.random(), imgYrl: img11 },
    { id: Math.random(), imgYrl: img12 },
  ];
  return (
    <div className="  py-3 my-5">
      <div className="flex justify-center">
        <div>
          <h1 className="font-bold text-2xl text-blue-500 ">المواد الدراسية</h1>
        </div>
      </div>

      <div dir="ltr" className="flex w-full my-5   ">
        <Marquee>
          {subjects.map((sub) => {
            return (
              <Card
                key={sub.id}
                className="w-[200px] mx-[10px] border m-2 p-2 shadow"
              >
                <img src={sub.imgYrl} className="h-[200px]" />
              </Card>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
};

export default Subject;
