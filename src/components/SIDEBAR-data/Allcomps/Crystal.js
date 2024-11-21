import React, { useState, useCallback } from "react";
import ToggleList from "./ToggleList";

const Crystal = () => {
  
  const [crystalTypes, setCrystalTypes] = useState([
    { name: "Acrylic", checked: false },
    { name: "Hesalite", checked: false },
    { name: "K1 Mineral", checked: false },
    { name: "Mineral", checked: false },
    { name: "Anti-Reflective", checked: false },
    { name: "Sapphire-Coated", checked: false },
    { name: "Sapphire", checked: false },
    { name: "Anti-Reflective", checked: false },
  ]);

  const handleCrystalTypeClick = useCallback((index) => {
    setCrystalTypes((prevCrystalTypes) =>
      prevCrystalTypes.map((crystalType, i) =>
        i === index ? { ...crystalType, checked: !crystalType.checked } : crystalType
      )
    );
  }, []);
  const isChecked = useCallback((index) => {
    return crystalTypes[index].checked;
  }, [crystalTypes]);

  return (
    <ToggleList
      title="CRYSTAL TYPE"
      items={crystalTypes}
      onToggleItem={handleCrystalTypeClick}
      isChecked={isChecked}
    />
  );
};

export default Crystal;
