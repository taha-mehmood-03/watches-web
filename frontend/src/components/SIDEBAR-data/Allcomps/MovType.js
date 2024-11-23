import React, { useState, useCallback } from 'react';
import ToggleList from './ToggleList';

const MovType = () => {
  const [movements, setMovements] = useState([
    { name: "Ana-Digi", checked: false },
    { name: "Automatic", checked: false },
    { name: "Digital", checked: false },
    { name: "Hand Wind", checked: false },
    { name: "Smartwatch", checked: false },
    { name: "Solar", checked: false },
    { name: "Proprietary", checked: false },
    { name: "Quartz", checked: false },
    { name: "Tourbillon", checked: false },
  ]);

  const handleMovementClick = useCallback((index) => {
    setMovements((prevMovements) =>
      prevMovements.map((movement, i) =>
        i === index ? { ...movement, checked: !movement.checked } : movement
      )
    );
  }, []);
  const isChecked = useCallback((index) => {
    return movements[index].checked;
  }, [movements]);
  return (
    <ToggleList
      title="MOV'T TYPE"
      items={movements}
      onToggleItem={handleMovementClick}
      isChecked={isChecked}
    />
  );
};

export default MovType;
