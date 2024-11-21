import React, { useCallback ,useState } from "react";
import ToggleList from "./ToggleList.js";

const Color = () => {
  const [colors, setColors] = useState([
    { name: "Beige", checked: false },
    { name: "Black", checked: false },
    { name: "Blue", checked: false },
    { name: "Brass", checked: false },
    { name: "Bronze", checked: false },
    { name: "Brown", checked: false },
    { name: "Camo", checked: false },
    { name: "Gold", checked: false },
    { name: "Green", checked: false },
    { name: "Grey", checked: false },
    { name: "Gunmetal", checked: false },
    { name: "Multi", checked: false },
    { name: "Orange", checked: false },
    { name: "Other", checked: false },
    { name: "Pink", checked: false },
    { name: "Red", checked: false },
    { name: "Rose Gold", checked: false },
    { name: "Silver", checked: false },
    { name: "Tan", checked: false },
    { name: "White", checked: false },
    { name: "Yellow", checked: false },
  ]);

  const handleColorClick = useCallback((index) => {
    setColors((prevColors) =>
      prevColors.map((color, i) =>
        i === index ? { ...color, checked: !color.checked } : color
      )
    );
  }, []);
  const isChecked = useCallback((index) => {
    return colors[index].checked;
  }, [colors]);
  return (
    <ToggleList
      title="COLORS"
      items={colors}
      onToggleItem={handleColorClick}
      isChecked={isChecked}
    />
  );
};

export default Color;
