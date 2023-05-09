import { RefObject, Dispatch, useEffect, useState, useRef } from 'react';
import { ToolSettings } from '../types/tool';

export const useCanvas = (
  toolSettings: ToolSettings,
  changeToolSettings: (s: ToolSettings) => void,
  setCanvasRef: Dispatch<
    React.SetStateAction<RefObject<HTMLCanvasElement> | undefined>
  >,
) => {
  const defaultCanvasWidth = 720;
  const defaultCanvasHeight = 720;

  const [states, setStates] = useState({
    isDrawing: false,
    offsetX: 0,
    offsetY: 0,
  });
  const [canvasScale, setCanvasScale] = useState({ x: 1.0, y: 1.0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateCanvasOffset = () => {
    let canvasRect = canvasRef.current?.getBoundingClientRect();

    if (canvasRect) {
      setStates({
        ...states,
        offsetX: canvasRect.left,
        offsetY: canvasRect.top,
      });
    }
  };

  const updateCanvasScale = () => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (canvasRect) {
      setCanvasScale({
        x: canvasRect.width / defaultCanvasWidth,
        y: canvasRect.height / defaultCanvasHeight,
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    handleDrawStart(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    handleDrawStart(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    handleDrawMove(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    handleDrawMove(e.clientX, e.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    handleDrawEnd();
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    handleDrawEnd();
  };

  const compareColor = (
    image: ImageData,
    currentX: number,
    currentY: number,
    selectColor: { r: number; g: number; b: number },
  ) => {
    if (
      currentX < 0 ||
      currentY < 0 ||
      currentX >= image.width ||
      currentY >= image.height
    )
      return false;
    const currentDataIndex = (currentY * image.width + currentX) * 4;
    const currentColor = {
      r: image.data[currentDataIndex],
      g: image.data[currentDataIndex + 1],
      b: image.data[currentDataIndex + 2],
    };

    if (
      selectColor.r !== currentColor.r ||
      selectColor.g !== currentColor.g ||
      selectColor.b !== currentColor.b
    ) {
      return false;
    }
    return true;
  };

  const regionFill = (
    image: ImageData,
    clickX: number,
    clickY: number,
    fillColor: { r: number; g: number; b: number },
  ) => {
    const img = image;
    const selectDataIndex = (clickY * image.width + clickX) * 4;
    const selectColor = {
      r: img.data[selectDataIndex],
      g: img.data[selectDataIndex + 1],
      b: img.data[selectDataIndex + 2],
    };

    if (
      fillColor.r === selectColor.r &&
      fillColor.g === selectColor.g &&
      fillColor.b === selectColor.b
    )
      return;

    let searchPixelStack = [{ x: clickX, y: clickY }];

    while (searchPixelStack.length) {
      const p = searchPixelStack.pop();
      if (p && compareColor(image, p.x, p.y, selectColor)) {
        const fillDataIdx = (p.y * image.width + p.x) * 4;

        img.data[fillDataIdx + 0] = fillColor.r;
        img.data[fillDataIdx + 1] = fillColor.g;
        img.data[fillDataIdx + 2] = fillColor.b;
        img.data[fillDataIdx + 3] = 255;

        if (compareColor(image, p.x, p.y - 1, selectColor)) {
          searchPixelStack.push({ x: p.x, y: p.y - 1 });
        }
        if (compareColor(image, p.x + 1, p.y, selectColor)) {
          searchPixelStack.push({ x: p.x + 1, y: p.y });
        }
        if (compareColor(image, p.x, p.y + 1, selectColor)) {
          searchPixelStack.push({ x: p.x, y: p.y + 1 });
        }
        if (compareColor(image, p.x - 1, p.y, selectColor)) {
          searchPixelStack.push({ x: p.x - 1, y: p.y });
        }
      }
    }

    return img;
  };

  const handleDrawStart = (clientX: number, clientY: number) => {
    let ctx = canvasRef.current?.getContext('2d');

    if (ctx) {
      const mouseX = (clientX - states.offsetX) / canvasScale.x;
      const mouseY = (clientY - states.offsetY) / canvasScale.y;
      updateCanvasOffset();

      if (toolSettings.activeTool == 'Pen') {
        setStates({ ...states, isDrawing: true });
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${toolSettings.penColor.r},${toolSettings.penColor.g},${toolSettings.penColor.b})`;
        ctx.lineWidth = toolSettings.penSize;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.moveTo(mouseX, mouseY);
      } else if (toolSettings.activeTool == 'Eraser') {
        setStates({ ...states, isDrawing: true });
        ctx.beginPath();
        ctx.strokeStyle = `white`;
        ctx.lineWidth = toolSettings.eraserSize;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.moveTo(mouseX, mouseY);
      } else if (toolSettings.activeTool == 'Dropper') {
        const image = ctx.getImageData(mouseX, mouseY, 1, 1);
        const selectColor = {
          r: image.data[0],
          g: image.data[1],
          b: image.data[2],
        };
        changeToolSettings({
          ...toolSettings,
          penColor: {
            r: selectColor.r,
            g: selectColor.g,
            b: selectColor.b,
            a: 255,
          },
        });
      } else if (toolSettings.activeTool == 'Fill') {
        const image = ctx.getImageData(
          0,
          0,
          defaultCanvasWidth,
          defaultCanvasHeight,
        );
        const filledImage = regionFill(
          image,
          Math.floor(mouseX),
          Math.floor(mouseY),
          toolSettings.penColor,
        );
        if (filledImage) ctx.putImageData(filledImage, 0, 0);
      }
    }
  };

  const handleDrawMove = (clientX: number, clientY: number) => {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      updateCanvasOffset();

      if (states.isDrawing) {
        ctx.lineTo(
          (clientX - states.offsetX) / canvasScale.x,
          (clientY - states.offsetY) / canvasScale.y,
        );
        ctx.stroke();
      }
    }
  };

  const handleDrawEnd = () => {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.closePath();
      setStates({ ...states, isDrawing: false });
    }
  };

  const drawBg = () => {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, defaultCanvasWidth, defaultCanvasHeight);
    }
  };

  useEffect(() => {
    updateCanvasOffset();
    updateCanvasScale();
    window.addEventListener('resize', updateCanvasScale);
    drawBg();
    setCanvasRef(canvasRef);
  }, []);

  return {
    defaultCanvasWidth,
    defaultCanvasHeight,
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
