'use client';
import SubmitForm from 'app/paint/SubmitForm';
import { RgbColor } from '@hello-pangea/color-picker';
import { RefObject, useState } from 'react';
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
  const [canvasRef, setCanvasRef] = useState<RefObject<HTMLCanvasElement>>();

  const exportCanvasImage = (): string | undefined => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/webp');

      return dataURL;
    }
    return undefined;
  };

  const changeToolSettings = (s: ToolSettings) => {
    setToolSettings(s);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-wrap justify-center gap-10">
        <Canvas toolSettings={toolSettings} setCanvasRef={setCanvasRef} />
        <ToolBox
          toolSettings={toolSettings}
          changeToolSettings={changeToolSettings}
        />
      </div>
      <SubmitForm exportCanvasImage={exportCanvasImage} />
    </div>
  );
}
