'use client';
import { RgbColor } from '@hello-pangea/color-picker';
import React, { useState } from 'react';
import Canvas from './Canvas';
import { ToolSettings } from './paint';
import ToolBox from './ToolBox';

export default function Page() {
  const defaultPenSize = 3;
  const defaultPenColor: RgbColor = { r: 0, g: 0, b: 0, a: 255 };

  const [toolSettings, setToolSettings] = useState({
    penSize: defaultPenSize,
    penColor: defaultPenColor,
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
