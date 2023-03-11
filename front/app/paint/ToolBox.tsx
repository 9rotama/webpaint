'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ColorResult, SketchPicker } from '@hello-pangea/color-picker';
import { ToolSettings } from './paint';

type Props = {
  toolSettings: ToolSettings;
  changeToolSettings: (s: ToolSettings) => void;
};

export default function ToolBox({ toolSettings, changeToolSettings }: Props) {
  const penSizeSliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (penSizeSliderRef.current) {
      penSizeSliderRef.current.value = toolSettings.penSize.toString();
    }
  }, []);

  const handlePenSizeSlider = () => {
    if (penSizeSliderRef.current) {
      changeToolSettings({
        ...toolSettings,
        penSize: parseInt(penSizeSliderRef.current.value),
      });
    }
  };

  const handleColorPicker = (c: ColorResult) => {
    changeToolSettings({
      ...toolSettings,
      penColor: c.rgb,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="">pen size {toolSettings.penSize}</label>
        <input
          type="range"
          min="1"
          max="50"
          ref={penSizeSliderRef}
          onChange={handlePenSizeSlider}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        />
      </div>
      <div>
        <label className="">pen color</label>
        <SketchPicker onChange={handleColorPicker} />
      </div>
    </div>
  );
}
