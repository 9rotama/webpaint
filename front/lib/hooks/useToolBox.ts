import { ColorResult } from '@hello-pangea/color-picker';
import { useEffect, useRef } from 'react';
import { ToolSettings } from '../types/tool';

export const useToolBox = (
  toolSettings: ToolSettings,
  changeToolSettings: (s: ToolSettings) => void,
) => {
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

  const handleSetTool = (n: string) => {
    changeToolSettings({
      ...toolSettings,
      activeTool: n,
    });
  };

  return {
    penSizeSliderRef,
    eraserSizeSliderRef,
    handlePenSizeSlider,
    handleEraserSizeSlider,
    handleColorPicker,
    handleSetTool,
  };
};
