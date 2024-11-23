import React, { useState } from "react";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from '@mui/icons-material/Close';
import Img from "./Watchesdotcom-W-Logo-Circle-100.avif";

const Sideoverlay = ({ toggle, onClose }) => {
  const [expanded, setExpanded] = useState({});

  const handleToggle = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index]
    }));
  };

  const menuItems = [
    {
      title: "Brands",
      links: [
        { name: "Aark" },
        { name: "Archetype" },
        { name: "Astronic" },
        { name: "Autodromo" },
        { name: "AVI-8" },
        { name: "Ballast" },
        { name: "Bertucci" },
        { name: "Cadola" },
        { name: "California Watch" },
        { name: "Casio" },
        { name: "CCCP" },
      ],
    },
    {
      title: "Collections",
      links: [],
    },
    {
      title: "Men",
      links: [],
    },
    {
      title: "Women",
      links: [],
    },
    {
      title: "New",
      links: [],
    },
    {
      title: "Sale",
      links: [],
    },
    {
      title: "Blog",
      links: [],
    },
  ];

  return (
    <div>
      <nav
        id="sidenav-1"
        className={`fixed top-[8%] lg:top-[14%] left-0 h-full w-80 bg-white transition-transform transform ${toggle ? 'translate-x-0 shadow-lg' : '-translate-x-96'} shadow-gray-600`}
      >
        <div className="flex justify-around gap-[12vw] items-center py-2 ">
          <div className="flex items-center">
            <div className="w-[70%] h-[70px] bg-gray-300 rounded-full">
              <img src={Img} alt="Logo" className="object-cover" />
            </div>
          </div>
          <div onClick={onClose} className="cursor-pointer ml-2">
            <CloseIcon />
          </div>
        </div>
        <ul className="list-none p-0 m-0">
          {menuItems.map((item, index) => (
            <li key={index} className="py-4 px-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => handleToggle(index)}>
                <a className="flex items-center text-black">
                  <span>{item.title}</span>
                </a>
                <div>
                  {expanded[index] ? <KeyboardArrowUpSharpIcon /> : <KeyboardArrowDownIcon />}
                </div>
              </div>
              {item.links.length > 0 && expanded[index] && (
                <ul className="pl-6 mt-2">
                  {item.links.map((link, subIndex) => (
                    <li key={subIndex} className="py-2">
                      <a className="text-gray-600 hover:text-gray-800">{link.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sideoverlay;
