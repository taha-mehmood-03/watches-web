import React, { useState, useCallback } from 'react';
import ToggleList from './ToggleList';

const Features = () => {
  const [features, setFeatures] = useState([
    { name: "24 Hour", checked: false },
    { name: "Activity Tracker", checked: false },
    { name: "Alarm", checked: false },
    { name: "Altimeter", checked: false },
    { name: "Atomic", checked: false },
    { name: "Backlight", checked: false },
    { name: "Bluetooth", checked: false },
    { name: "Calendar", checked: false },
    { name: "Chronograph", checked: false },
    { name: "Compass", checked: false },
    { name: "Date", checked: false },
    { name: "GMT", checked: false },
    { name: "Luminous", checked: false },
    { name: "Moonphase", checked: false },
    { name: "Multiple Time Zone", checked: false },
    { name: "Smart", checked: false },
    { name: "Solar", checked: false },
    { name: "Step Tracker", checked: false },
    { name: "Temperature", checked: false },
    { name: "Tide", checked: false },
    { name: "World Time", checked: false },
  ]);

  const handleFeatureClick = useCallback((index) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature, i) =>
        i === index ? { ...feature, checked: !feature.checked } : feature
      )
    );
  }, [features]);
  const isChecked = useCallback((index) => {
    return features[index].checked;
  }, [features]);
  return (
    <ToggleList
      title="FEATURES"
      items={features}
      onToggleItem={handleFeatureClick}
      isChecked={isChecked}
    />
  );
};

export default Features;
