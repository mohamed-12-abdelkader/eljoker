import { Fade, Zoom } from "react-awesome-reveal";
import img from "../../img/logo22 (1).png";
const SectionFour = () => {
  return (
    <div
      className="my-9 p-3 bg-gradient-to-r from-blue-50 via-cyan-50 to-purple-50"
      style={{
        borderTopLeftRadius: "100px",
        borderBottomLeftRadius: "100px",
      }}
    >
      <div className="w-[95%] h-[350px] m-auto md:flex justify-between items-center">
        <div>
          <Zoom>
            <img src="1749837322999-removebg-preview.png" className="h-[300px] m-auto" />
          </Zoom>
        </div>
        <div className="text-center">
          <Fade bottom>
            <h1 className="big-font md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              تعلم الكيمياء مع أستاذ مصطفى نوفل
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mt-3 font-medium">
              نحول الكيمياء من مادة معقدة إلى رحلة تعليمية ممتعة
            </p>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default SectionFour;
