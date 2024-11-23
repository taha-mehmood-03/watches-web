import React, { useState, useCallback } from "react";
import ToggleList from "./ToggleList";

const Strap = () => {
  const [strapMaterials, setStrapMaterials] = useState([
    { id: 1, name: "Ceramic", checked: false },
    { id: 2, name: "Cork", checked: false },
    { id: 3, name: "Fabric", checked: false },
    { id: 4, name: "Leather", checked: false },
    { id: 5, name: "Mesh", checked: false },
    { id: 6, name: "Nylon", checked: false },
    { id: 7, name: "Polycarbonate", checked: false },
    { id: 8, name: "Recycled PET", checked: false },
    { id: 9, name: "Resin", checked: false },
    { id: 10, name: "Rubber", checked: false },
    { id: 11, name: "Stainless Steel", checked: false },
    { id: 12, name: "Titanium", checked: false },
  ]);

  const handleStrapMaterialClick = useCallback((index) => {
    setStrapMaterials((prevMaterials) =>
      prevMaterials.map((material, i) =>
        i === index ? { ...material, checked: !material.checked } : material
      )
    );
  }, []);

  const isChecked = useCallback((index) => {
    return strapMaterials[index].checked;
  }, [strapMaterials]);


  return (
    <ToggleList
      title="STRAP MATERIAL"
      items={strapMaterials}
      onToggleItem={handleStrapMaterialClick}
      isChecked={isChecked}
    />
  );
};

export default Strap;
