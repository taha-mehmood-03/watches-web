import React, { lazy, Suspense } from 'react';
import Navbar from '../../NAVIGATION-BAR/Navbar';
import Sideoverlay from './Sideoverlay';
import Footer from '../../Footer/Footer';

const BoughtWatch = lazy(() => import('./BoughtWatch'));

const Cart = () => {
  const [toggle, setToggle] = React.useState(false);

  const handleClick = () => {
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar handleClick={handleClick} />
      <Sideoverlay toggle={toggle} onClose={handleClose} />
      <div className="  mt-20">
        
          <Suspense fallback={<div className="text-white text-center mt-4">Loading...</div>}>
            <BoughtWatch />
          </Suspense>
        
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
