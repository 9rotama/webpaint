'use client';
import React, { useEffect, useRef } from 'react';
import { ColorResult, SketchPicker } from '@hello-pangea/color-picker';
import ToolButton from '@/ui/ToolButton';
import { ToolSettings, Tool } from './paint';
import { Tools } from './tools';

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

  const handleToolIcon = (n: string) => {
    changeToolSettings({
      ...toolSettings,
      activeTool: n,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        {Tools.map((tool: Tool) => (
          <ToolButton
            key={tool.name}
            icon={tool.icon}
            isActive={toolSettings.activeTool === tool.name ? true : false}
            handleClick={() => handleToolIcon(tool.name)}
          />
        ))}
      </div>
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
