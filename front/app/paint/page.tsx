'use client';
import React, { useState } from 'react';
import Canvas from './Canvas';
import ToolBox from './ToolBox';

export default function Page() {
  const defaultPenSize = 3;
  const [toolSettings, setToolSettings] = useState({
    penSize: defaultPenSize,
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
