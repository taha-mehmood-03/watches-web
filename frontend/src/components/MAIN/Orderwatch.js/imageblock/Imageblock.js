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

  const selectedImage = currentImage 
  ? require(`../../../../../public/images/${currentImage}`).default 
  : (currentWatch?.images?.length > 0 
      ? require(`../../../../../public/images/${currentWatch.images[0]}`).default 
      : null);

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
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-full   object-cover"
          style={{ display: "block" }} // Ensure the image is displayed as a block element
        />
      )}
    </div>
  );
};

export default Imageblock;
