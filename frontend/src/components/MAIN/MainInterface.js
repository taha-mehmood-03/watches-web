import React, { useEffect, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Header = lazy(() => import("./Producthead/Header"));
const Card = lazy(() => import("./CARDS/Card"));

const MainInterface = () => {
 
  return (
    <div
      className="flex w-full flex-col mt-32  gap-5"
    
    >
      <div>
        <Suspense >
          <Header />
        </Suspense>
      </div>
      <div>
        <Suspense >
          <Card />
        </Suspense>
      </div>
    </div>
  );
};

export default MainInterface;
