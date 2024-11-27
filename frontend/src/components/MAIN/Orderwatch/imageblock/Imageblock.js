import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

const Imageblock = () => {
  const currentImage = useSelector((state) => state.image.currentImage);
  const currentWatch = useSelector((state) => state.watch.currentWatch);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  // Directly resolve the image using `require` with `currentImage` or fallback to the first image in `currentWatch`
 
  const  imageSrc = require(`../../../../../public/images/${currentImage || currentWatch.images[0]}`);
 

  return (
    <div
      className="w-full"
      data-aos="fade-down"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="true"
      data-aos-anchor-placement="top-center"
      style={{ minHeight: "300px", position: "relative" }} // Set a minimum height to prevent CLS
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Selected"
          className="w-full h-full object-cover"
          style={{ display: "block" }} // Ensure the image is displayed as a block element
        />
      ) : (
        <div className="text-center text-gray-500">Image not available</div>
      )}
    </div>
  );
};

export default Imageblock;
