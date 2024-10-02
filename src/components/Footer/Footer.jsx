import { FaFacebookSquare, FaTelegramPlane, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      dir="ltr"
      className=" bg-[#212121] flex items-center justify-center h-[250px]  "
    >
      <div>
        <div className="w-[90%] m-auto text-center md:w-[100%]">
          <h1 className="font-bold big-font text-[#03a9f5] md:text-xl">
            We Can learn how to deal with Grammer rules 👌🏻{" "}
          </h1>
        </div>
        <div className="flex justify-center  my-3">
          <a href="https://www.facebook.com/profile.php?id=61556280021487&mibextid=kFxxJD">
            <FaFacebookSquare className="text-4xl text-white mx-2" />
          </a>
          <a href="#">
            <FaYoutube className="text-4xl text-red-500 mx-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
