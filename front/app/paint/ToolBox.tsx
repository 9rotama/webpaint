'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function ToolBox() {
  const defaultPenSize = 3;
  const [states, setStates] = useState({
    penSize: defaultPenSize,
  });
  const penSizeSliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (penSizeSliderRef.current) {
      penSizeSliderRef.current.value = defaultPenSize.toString();
    }
  }, []);

  const handlePenSizeSlider = () => {
    if (penSizeSliderRef.current) {
      setStates({
        ...states,
        penSize: parseInt(penSizeSliderRef.current.value),
      });
    }
    console.log(states.penSize);
  };

  return (
    <div>
      <label className="">pen size</label>
      <input
        type="range"
        min="1"
        max="50"
        ref={penSizeSliderRef}
        onChange={handlePenSizeSlider}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
      />
    </div>
  );
}
