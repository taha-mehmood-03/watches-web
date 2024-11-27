import React from "react";
import { useSelector } from "react-redux";

const Image2block = () => {
  const currentWatch = useSelector((state) => state.watch.currentWatch);

  let imageSrc = "";

  // Dynamically require the image if `currentWatch.images` and the second image exist
  try {
    if (currentWatch?.images?.[1]) {
      imageSrc = require(`../../../../../public/images/${currentWatch.images[1]}`).default;
    }
  } catch (error) {
    console.error("Image not found or failed to load:", error);
  }

  return (
    <div
      className="hidden lg:block lg:w-[48vw] 5xl:w-[30vw]"
      data-aos="fade-left"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Watch Image"
          className="w-[95%] h-full lg:object-contain"
        />
      ) : (
        <div className="w-[95%] h-full lg:object-contain">
          Image not available
        </div>
      )}
    </div>
  );
};

export default Image2block;
