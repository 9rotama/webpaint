import React, { useEffect, useRef } from 'react';
import { ColorResult, SketchPicker } from '@hello-pangea/color-picker';
import ToolButton from 'app/paint/ToolButton';
import { ToolSettings, Tool } from './paint';
import { Tools } from './tools';

type Props = {
  toolSettings: ToolSettings;
  changeToolSettings: (s: ToolSettings) => void;
};

export default function ToolBox({ toolSettings, changeToolSettings }: Props) {
  const penSizeSliderRef = useRef<HTMLInputElement>(null);
  const eraserSizeSliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (penSizeSliderRef.current) {
      penSizeSliderRef.current.value = toolSettings.penSize.toString();
    }
    if (eraserSizeSliderRef.current) {
      eraserSizeSliderRef.current.value = toolSettings.penSize.toString();
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

  const handleEraserSizeSlider = () => {
    if (eraserSizeSliderRef.current) {
      changeToolSettings({
        ...toolSettings,
        eraserSize: parseInt(eraserSizeSliderRef.current.value),
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
    <div className="flex w-64 flex-col gap-3">
      {/*ツールアイコン*/}
      <div className="flex">
        {Tools.map((tool: Tool) => (
          <ToolButton
            key={tool.name}
            icon={tool.icon}
            isActive={toolSettings.activeTool === tool.name ? true : false}
            handleClick={() => handleToolIcon(tool.name)}
          />
        ))}
      </div>
      {
        /*ペンの設定*/
        toolSettings.activeTool === 'Pen' && (
          <>
            <div>
              <label className="">size {toolSettings.penSize}</label>
              <input
                type="range"
                value={toolSettings.penSize}
                min="1"
                max="50"
                ref={penSizeSliderRef}
                onChange={handlePenSizeSlider}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
              />
            </div>
          </>
        )
      }
      {
        /*消しゴムの設定*/
        toolSettings.activeTool === 'Eraser' && (
          <div>
            <label className="">size {toolSettings.eraserSize}</label>
            <input
              type="range"
              value={toolSettings.eraserSize}
              min="1"
              max="100"
              ref={eraserSizeSliderRef}
              onChange={handleEraserSizeSlider}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
          </div>
        )
      }
      <div>
        <label className="">color</label>
        <SketchPicker onChange={handleColorPicker} />
      </div>
    </div>
  );
}
