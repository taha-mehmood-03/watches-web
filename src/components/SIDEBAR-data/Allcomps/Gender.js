import React, { useState, useCallback } from "react";
import ToggleList from "./ToggleList";
const Gender = () => {
  const [genders, setGenders] = useState([
    { name: "Men", checked: false },
    { name: "Women", checked: false },
    { name: "Unisex", checked: false },
  ]);

  const handleGenderClick = (index) => {
    setGenders((prevGenders) =>
      prevGenders.map((gender, i) =>
        i === index ? { ...gender, checked: !gender.checked } : gender
      )
    );
  };
  const isChecked = useCallback((index) => {
    return genders[index].checked;
  }, [genders]);
  return (
    <ToggleList
      title="GENDERS"
      items={genders}
      onItemToggle={handleGenderClick}
      isChecked={isChecked}
    />
  );
};


export default Gender;
