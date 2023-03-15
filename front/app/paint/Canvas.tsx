'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ToolSettings } from './paint';

type Props = {
  toolSettings: ToolSettings;
};

export default function Canvas({ toolSettings }: Props) {
  const canvasWidth = 720;
  const canvasHeight = 720;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasOverlayRef = useRef<HTMLCanvasElement>(null);

  const [states, setStates] = useState({
    isDrawing: false,
    offsetX: 0,
    offsetY: 0,
  });

  const calcCanvasOffset = () => {
    let canvasRect = canvasRef.current?.getBoundingClientRect();

    if (canvasRect) {
      setStates({
        ...states,
        offsetX: canvasRect.left,
        offsetY: canvasRect.top,
      });
    }
  };

  useEffect(() => {
    calcCanvasOffset();
    drawBg();
  }, []);

  const drawBg = () => {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    let ctx = canvasRef.current?.getContext('2d');

    if (ctx) {
      calcCanvasOffset();
      setStates({ ...states, isDrawing: true });
      ctx.beginPath();
      ctx.strokeStyle =
        toolSettings.activeTool === 'Eraser'
          ? `white`
          : `rgb(${toolSettings.penColor.r},${toolSettings.penColor.g},${toolSettings.penColor.b})`;
      ctx.lineWidth = toolSettings.penSize;
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.moveTo(e.clientX - states.offsetX, e.clientY - states.offsetY);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      calcCanvasOffset();
      if (states.isDrawing) {
        ctx.lineTo(e.clientX - states.offsetX, e.clientY - states.offsetY);
        ctx.stroke();
      }
    }
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.closePath();
      setStates({ ...states, isDrawing: false });
    }
  };

  return (
    <div className="bg-gray-200 p-3">
      <canvas
        className="relative top-0 left-0"
        width={canvasWidth.toString()}
        height={canvasHeight.toString()}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas
          className="absolute top-0 left-0"
          width={canvasWidth.toString()}
          height={canvasHeight.toString()}
          ref={canvasOverlayRef}
        />
      </canvas>
    </div>
  );
}
