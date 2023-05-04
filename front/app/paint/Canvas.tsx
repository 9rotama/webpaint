import {
  useLayoutEffect,
  RefObject,
  Dispatch,
  useEffect,
  useState,
  useRef,
} from 'react';
import { ToolSettings } from './paint';

type Props = {
  toolSettings: ToolSettings;
  setCanvasRef: Dispatch<
    React.SetStateAction<RefObject<HTMLCanvasElement> | undefined>
  >;
};

export default function Canvas({ toolSettings, setCanvasRef }: Props) {
  const defaultCanvasWidth = 720;
  const defaultCanvasHeight = 720;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [states, setStates] = useState({
    isDrawing: false,
    offsetX: 0,
    offsetY: 0,
  });
  const [canvasScale, setCanvasScale] = useState({ x: 1.0, y: 1.0 });

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

  const calcCanvasScale = () => {
    const updateScale = () => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (canvasRect) {
        setCanvasScale({
          x: canvasRect.width / defaultCanvasWidth,
          y: canvasRect.height / defaultCanvasHeight,
        });
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
  };

  useEffect(() => {
    calcCanvasOffset();
    calcCanvasScale();
    drawBg();
    setCanvasRef(canvasRef);
  }, []);

  const drawBg = () => {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, defaultCanvasWidth, defaultCanvasHeight);
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
      ctx.lineWidth =
        toolSettings.activeTool === 'Eraser'
          ? toolSettings.eraserSize
          : toolSettings.penSize;
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.moveTo(
        (e.clientX - states.offsetX) / canvasScale.x,
        (e.clientY - states.offsetY) / canvasScale.y,
      );
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    let ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      calcCanvasOffset();
      if (states.isDrawing) {
        ctx.lineTo(
          (e.clientX - states.offsetX) / canvasScale.x,
          (e.clientY - states.offsetY) / canvasScale.y,
        );
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
    <div className="relative top-0 left-0 w-full max-w-[720px] border-8">
      <canvas
        className="w-full"
        width={defaultCanvasWidth.toString()}
        height={defaultCanvasHeight.toString()}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
