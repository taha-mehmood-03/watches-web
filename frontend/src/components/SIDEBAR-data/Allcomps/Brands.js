import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInput, removeInput } from "../InputManagement";
import ToggleList from "./ToggleList.js";

const Brands = () => {
  const brands = useSelector((state) => state.input.brands);
  const dispatch = useDispatch();

  const isChecked = useCallback((index) => {
    return brands[index].checked;
  }, [brands]);

  const handleBrandClick = useCallback(
    (index) => {
      const brand = brands[index];
      const updatedBrands = [...brands];
      updatedBrands[index] = { ...brand, checked: !brand.checked };
      dispatch(updatedBrands[index].checked ? setInput(brand) : removeInput(brand));
    },
    [brands, dispatch]
  );

  return (
    <ToggleList
      title="BRANDS"
      items={brands}
      onToggleItem={handleBrandClick}
      isChecked={isChecked}
    />
  );
};

export default Brands;
