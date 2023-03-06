'use client';
import { useEffect, useRef } from 'react';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasOverlayRef = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D | null | undefined;

  const canvasWidth = 720;
  const canvasHeight = 720;

  const drawBg = () => {
    if (ctx != null) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
  };

  const handleMouseDown = () => {};

  useEffect(() => {
    ctx = canvasRef.current?.getContext('2d');
    drawBg();
  }, []);

  return (
    <div className="bg-gray-200 p-3">
      <canvas
        className="relative top-0 left-0"
        width={canvasWidth.toString()}
        height={canvasHeight.toString()}
        ref={canvasRef}
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
