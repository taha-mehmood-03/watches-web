import React, { useCallback,useState  } from "react";
import ToggleList from "./ToggleList.js";

const Casesizes = () => {
  const [caseSizes, setCaseSizes] = useState([
    { name: "26mm", checked: false },
    { name: "30mm", checked: false },
    { name: "31mm", checked: false },
    { name: "32mm", checked: false },
    { name: "34mm", checked: false },
    { name: "35mm", checked: false },
    { name: "36mm", checked: false },
    { name: "37mm", checked: false },
    { name: "38mm", checked: false },
    { name: "39mm", checked: false },
    { name: "40mm", checked: false },
    { name: "41mm", checked: false },
    { name: "42mm", checked: false },
    { name: "43mm", checked: false },
    { name: "44mm", checked: false },
    { name: "45mm", checked: false },
    { name: "46mm", checked: false },
    { name: "47mm", checked: false },
    { name: "48mm", checked: false },
    { name: "49mm", checked: false },
    { name: "50mm", checked: false },
    { name: "51mm", checked: false },
    { name: "52mm", checked: false },
    { name: "53mm", checked: false },
    { name: "54mm", checked: false },
    { name: "55mm", checked: false },
    { name: "57mm", checked: false },
  ]);

  const handleCaseSizeClick = useCallback((index) => {
    setCaseSizes((prevCaseSizes) =>
      prevCaseSizes.map((caseSize, i) =>
        i === index ? { ...caseSize, checked: !caseSize.checked } : caseSize
      )
    );
  }, []);
  const isChecked = useCallback((index) => {
    return caseSizes[index].checked;
  }, [caseSizes]);
  return (
    <ToggleList
      title="CASE SIZES"
      items={caseSizes}
      onToggleItem={handleCaseSizeClick}
      isChecked={isChecked}
    />
  );
};

export default Casesizes;
