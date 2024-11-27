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

  // Function to safely require the image
  const requireImage = (imageName) => {
    try {
      return require(`../../../../public/images/${imageName}`);
    } catch (error) {
      console.error(`Failed to load image: ${imageName}`, error);
      return null; // Fallback if image cannot be loaded
    }
  };

  // Determine the selected image, using require to load it
  const selectedImage = currentImage 
    ? requireImage(currentImage)
    : (currentWatch.images.length > 0 
      ? requireImage(currentWatch.images[0]) 
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
      style={{ minHeight: "300px", position: "relative" }}
    >
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
      )}
    </div>
  );
};

export default Imageblock;