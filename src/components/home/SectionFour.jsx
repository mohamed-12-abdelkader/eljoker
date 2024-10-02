import { Fade, Zoom } from "react-awesome-reveal";
import img from "../../img/logo22 (1).png";
const SectionFour = () => {
  return (
    <div
      className="  my-9 p-3 bg-[#e5dcc7] "
      style={{
        borderTopLeftRadius: "100px",
        borderBottomLeftRadius: "100px",
      }}
    >
      <div className="w-[95%] h-[350px] m-auto md:flex justify-between items-center">
        <div>
          <Zoom>
            <img src={img} className="h-[300px] m-auto" />
          </Zoom>
        </div>
        <div className="text-center">
          <Fade bottom>
            <h1 className="big-font md:text-3xl text-red-500">
              Study with The Joker
            </h1>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default SectionFour;
