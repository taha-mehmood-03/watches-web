import React from 'react'
import AddressInfo from './AddressInfo'
import ObjectInfo from './ObjectInfo'
import Footer from '../Footer/Footer'
import Navbar from '../NAVIGATION-BAR/Navbar'
const Addresspage = () => {
  return (
 
   <div className='min-h-screen flex flex-col'>
   <Navbar/>
    <div className='flex flex-col-reverse lg:flex lg:flex-row lg:flex lg:gap-2 sm:mx-auto sm:w-4/6  bg-gray-800  lg:justify-center pt-20 lg:w-full'>
      <AddressInfo/>
      <ObjectInfo/>
      
    </div>
    <Footer/>
    </div> 
  )
}

export default Addresspage
