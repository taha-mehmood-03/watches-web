import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../../SIDEBAR-data/ImageManagement";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Sideimages = () => {
  const [index, setIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dispatch = useDispatch();
  const currentWatch = useSelector((state) => state.watch.currentWatch);

  const handleImageClick = (image, idx) => {
    dispatch(setImage(image));
    setIndex(idx);
    setSelectedIndex(idx);
  };

  const handleArrowClick = (direction) => {
    if (currentWatch && currentWatch.images) {
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < currentWatch.images.length) {
        setIndex(newIndex);
        handleImageClick(currentWatch.images[newIndex], newIndex);
      }
    }
  };

  return (
    <div className="flex flex-row w-[75vw] mx-[12%] lg:w-auto lg:flex-col items-center justify-center lg:mx-3 5xl:h-2/4 lg:h-3/4 gap-2 text-white"
      data-aos="fade-right"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="true"
      data-aos-anchor-placement="top-center">
      <KeyboardArrowUpSharpIcon className="text-4xl lg:block hidden hover:cursor-pointer"
        onClick={() => handleArrowClick("up")} />
      <KeyboardArrowLeftIcon className="text-4xl lg:hidden block hover:cursor-pointer"
        onClick={() => handleArrowClick("up")} />
      <div className="flex overflow-x-auto lg:flex-col no-scrollbar lg:overflow-y-auto gap-2 5xl:w-36 lg:w-24 lg:h-4/4 w-full h-full p-2">
        {currentWatch && currentWatch.images && currentWatch.images.map((image, idx) => {

         const imageSrc = require(`../../../../../public/images/${image}`);
          <div key={idx}
            className={`flex-shrink-0 flex-grow-0 w-20 h-20 md:w-32 5xl:h-32 md:h-32 5xl:w-32 lg:w-20 lg:h-20 transition-transform duration-300 transform ${selectedIndex === idx ? "rotate-0 scale-110 border-4 border-green-600" : "rotate-3 hover:rotate-0 hover:scale-110 hover:border-4 hover:border-orange-600"}`}
            onClick={() => handleImageClick(image, idx)}>
            <img src={imageSrc} alt={`image-${idx}`} className="w-full h-full object-contain" />
          </div>
        })}
      </div>
      <KeyboardArrowDownIcon className="text-4xl hidden lg:block hover:cursor-pointer"
        onClick={() => handleArrowClick("down")} />
      <KeyboardArrowRightIcon className="text-4xl lg:hidden block hover:cursor-pointer"
        onClick={() => handleArrowClick("down")} />
    </div>
  );
};

export default Sideimages;
