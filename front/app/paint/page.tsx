'use client';
import { RgbColor } from '@hello-pangea/color-picker';
import React, { useState } from 'react';
import Canvas from './Canvas';
import { ToolSettings } from './paint';
import ToolBox from './ToolBox';
import { Tools } from './tools';

export default function Page() {
  const defaultPenSize = 3;
  const defaultEraserSize = 5;
  const defaultPenColor: RgbColor = { r: 0, g: 0, b: 0, a: 255 };
  const defaultTool = Tools[0].name;

  const [toolSettings, setToolSettings] = useState({
    penSize: defaultPenSize,
    penColor: defaultPenColor,
    eraserSize: defaultEraserSize,
    activeTool: defaultTool,
  });

  const changeToolSettings = (s: ToolSettings) => {
    setToolSettings(s);
  };

  return (
    <>
      <Canvas toolSettings={toolSettings} />
      <ToolBox
        toolSettings={toolSettings}
        changeToolSettings={changeToolSettings}
      />
    </>
  );
}
