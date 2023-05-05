'use client';
import SubmitFormModal from 'app/paint/SubmitFormModal';
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
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  const exportCanvasImage = (): string | undefined => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/webp');

      return dataURL;
    }
    return undefined;
  };

  const handleShowSubmitModal = () => {
    setShowSubmitModal(true);
  };

  const handleCloseSubmitModal = () => {
    setShowSubmitModal(false);
  };

  const changeToolSettings = (s: ToolSettings) => {
    setToolSettings(s);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-wrap justify-center gap-10">
        <Canvas
          toolSettings={toolSettings}
          changeToolSettings={changeToolSettings}
          setCanvasRef={setCanvasRef}
        />
        <div className="flex flex-col gap-10">
          <ToolBox
            toolSettings={toolSettings}
            changeToolSettings={changeToolSettings}
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            onClick={handleShowSubmitModal}
          >
            finished!
          </button>
        </div>
      </div>
      <SubmitFormModal
        exportCanvasImage={exportCanvasImage}
        show={showSubmitModal}
        handleClose={handleCloseSubmitModal}
      />
    </div>
  );
}
