'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function Canvas() {
  const canvasWidth = 720;
  const canvasHeight = 720;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasOverlayRef = useRef<HTMLCanvasElement>(null);

  const [states, setStates] = useState({
    isDrawing: false,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    let canvasRect = canvasRef.current?.getBoundingClientRect();

    if (canvasRect) {
      setStates({
        ...states,
        offsetX: canvasRect.left,
        offsetY: canvasRect.top,
      });
    }
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
      setStates({ ...states, isDrawing: true });
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.moveTo(e.clientX - states.offsetX, e.clientY - states.offsetY);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
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
