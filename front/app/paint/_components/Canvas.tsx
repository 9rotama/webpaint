import { useCanvas } from '@/lib/hooks/useCanvas';
import { RefObject, Dispatch } from 'react';
import { ToolSettings } from '../../../lib/types/tool';

type Props = {
  toolSettings: ToolSettings;
  changeToolSettings: (s: ToolSettings) => void;
  setCanvasRef: Dispatch<
    React.SetStateAction<RefObject<HTMLCanvasElement> | undefined>
  >;
};

export default function Canvas({
  toolSettings,
  changeToolSettings,
  setCanvasRef,
}: Props) {
  const {
    defaultCanvasWidth,
    defaultCanvasHeight,
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useCanvas(toolSettings, changeToolSettings, setCanvasRef);

  return (
    <div className="relative top-0 left-0 w-full max-w-[720px] border-8">
      <canvas
        className="w-full"
        width={defaultCanvasWidth.toString()}
        height={defaultCanvasHeight.toString()}
        ref={canvasRef}
        style={{ touchAction: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      />
    </div>
  );
}
