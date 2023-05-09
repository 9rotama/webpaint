import React from 'react';
import { ColorResult, SketchPicker } from '@hello-pangea/color-picker';
import ToolButton from 'app/paint/_components/ToolButton';
import { ToolSettings, Tool } from '../../../lib/types/tool';
import { Tools } from '../../../lib/const/tools';
import { useToolBox } from '@/lib/hooks/useToolBox';

type Props = {
  toolSettings: ToolSettings;
  changeToolSettings: (s: ToolSettings) => void;
};

export default function ToolBox({ toolSettings, changeToolSettings }: Props) {
  const {
    penSizeSliderRef,
    eraserSizeSliderRef,
    handlePenSizeSlider,
    handleEraserSizeSlider,
    handleColorPicker,
    handleSetTool,
  } = useToolBox(toolSettings, changeToolSettings);

  return (
    <div className="flex w-64 flex-col gap-3">
      {/*ツールアイコン*/}
      <div className="flex">
        {Tools.map((tool: Tool) => (
          <ToolButton
            key={tool.name}
            icon={tool.icon}
            isActive={toolSettings.activeTool === tool.name ? true : false}
            handleClick={() => handleSetTool(tool.name)}
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
        <SketchPicker
          onChange={handleColorPicker}
          color={toolSettings.penColor}
        />
      </div>
    </div>
  );
}
