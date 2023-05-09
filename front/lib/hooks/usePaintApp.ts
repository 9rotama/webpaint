import { RgbColor } from '@hello-pangea/color-picker';
import { RefObject, useState } from 'react';
import { ToolSettings } from '../types/tool';
import { Tools } from '../const/tools';

export const usePaintApp = () => {
  const defaultToolSettings: ToolSettings = {
    penSize: 3,
    eraserSize: 5,
    penColor: { r: 0, g: 0, b: 0, a: 255 },
    activeTool: Tools[0].name,
  };

  const [toolSettings, setToolSettings] =
    useState<ToolSettings>(defaultToolSettings);
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

  return {
    toolSettings,
    showSubmitModal,
    setCanvasRef,
    exportCanvasImage,
    handleShowSubmitModal,
    handleCloseSubmitModal,
    changeToolSettings,
  };
};
