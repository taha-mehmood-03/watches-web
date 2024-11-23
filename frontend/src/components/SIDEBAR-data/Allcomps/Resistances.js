import React, { useState, useCallback } from "react";
import ToggleList from "./ToggleList";

const Resistances = () => {
  const [waterResistances, setWaterResistances] = useState([
    { name: "1 ATM", checked: false },
    { name: "3 ATM", checked: false },
    { name: "5 ATM", checked: false },
    { name: "10 ATM", checked: false },
    { name: "15 ATM", checked: false },
    { name: "20 ATM", checked: false },
    { name: "30 ATM", checked: false },
    { name: "50 ATM", checked: false },
    { name: "100 ATM", checked: false },
    { name: "200 ATM", checked: false },
  ]);

  const handleWaterResistanceClick = useCallback((index) => {
    setWaterResistances((prevResistances) =>
      prevResistances.map((resistance, i) =>
        i === index ? { ...resistance, checked: !resistance.checked } : resistance
      )
    );
  }, []);
  const isChecked = useCallback((index) => {
    return waterResistances[index].checked;
  }, [waterResistances]);
  return (
    <ToggleList
      title="WATER RESISTANCE"
      items={waterResistances}
      onToggleItem={handleWaterResistanceClick}
      isChecked={isChecked}
    />
  );
};

export default Resistances;
