import React, { useEffect } from "react";
import Navbar from "../../NAVIGATION-BAR/Navbar";
import Addcart from "./AddToCart/Addcart";
import Imageblock from "./imageblock/Imageblock";
import Moredetails from "./Details/Moredetails";
import Image2block from "./image2block/Image2block";
import Sideimages from "./Sidebarimages/Sideimages";
import { setWatch, clearError } from "../../SIDEBAR-data/WatchManagement";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Footer/Footer";
import LazyLoad from 'react-lazyload';
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ordering = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const dispatch = useDispatch();
  const currentWatch = useSelector((state) => state.watch.currentWatch);
  const error = useSelector((state) => state.watch.error);

  useEffect(() => {
    if (currentWatch) {
      dispatch(setWatch(currentWatch));
    }
  }, [dispatch, currentWatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <Navbar />
      <div className="items-center justify-center flex flex-col w-full overflow-x-hidden">
        <div className="flex flex-col 5xl:flex 5xl:items-center w-full gap-10 lg:gap-10 2xl:gap-20 py-4 mt-40">
          <div className="flex flex-col w-full 5xl:w-3/5 lg:flex-row 2xl:mx-2 gap-5">
            <div className="flex flex-col-reverse lg:items-start 2xl:justify-between 5xl:justify-center lg:flex-row gap-4 lg:gap-0 w-full 2xl:w-3/5 2xl:h-3/4">
              <LazyLoad>
                <Sideimages />
              </LazyLoad>
              <LazyLoad>
                <Imageblock />
              </LazyLoad>
            </div>
            <div
              className="2xl:w-1/5 5xl:w-2/5"
              data-aos="fade-left"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            >
              <LazyLoad>
                <Addcart />
              </LazyLoad>
            </div>
          </div>
          <div className="flex flex-col 5xl:w-3/5 lg:flex-row lg:justify-between lg:items-start lg:gap-2 gap-10 py-4 ">
            <LazyLoad>
              <Moredetails />
            </LazyLoad>
            <div>
              <LazyLoad>
                <Image2block />
              </LazyLoad>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Ordering;