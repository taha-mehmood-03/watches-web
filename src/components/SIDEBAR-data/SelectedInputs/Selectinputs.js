import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { removeInput } from "../InputManagement";

const Selectinputs = () => {
  const currentInput = useSelector((state) => state.input.currentInput);
  const dispatch = useDispatch();

  const deleteSelection = (input) => {
   
    dispatch(removeInput(input));
      
  };

  return (
    <div className="flex flex-col lg:justify-center bg-red-300  lg:items-center gap-5 max-h-[2000vh] relative top-0 bg-gray-900 text-gray-800">
  {currentInput &&
    currentInput.map((input, index) => (
      <div
        key={index}
        className="w-72 rounded-[2%]  h-16 bg-white flex items-center justify-around text-black lg:w-[80%]  text-bold "
      >
        <div>{input.name}</div>
        <div>
          <CloseIcon
            className="bg-red-400"
            onClick={() => deleteSelection(input)}
          />
        </div>
      </div>
    ))}
</div>
  );
};

export default Selectinputs;
