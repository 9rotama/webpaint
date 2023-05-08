'use client';

import SubmitFormModal from './_components/SubmitFormModal';
import Canvas from './_components/Canvas';
import ToolBox from './_components/ToolBox';
import { usePaintApp } from '@/lib/hooks/usePaintApp';

export default function Page() {
  const {
    toolSettings,
    showSubmitModal,
    setCanvasRef,
    exportCanvasImage,
    handleShowSubmitModal,
    handleCloseSubmitModal,
    changeToolSettings,
  } = usePaintApp();

  return (
    <div className="flex animate-opaque flex-col justify-center">
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
            className="rounded-xl bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-700"
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
