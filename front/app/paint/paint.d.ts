import { RgbColor } from '@hello-pangea/color-picker';

type ToolSettings = {
  penSize: number;
  penColor: RgbColor;
  eraserSize: number;
  activeTool: string;
};

type Tool = {
  name: string;
  icon: IconDefinition;
};

type SubmitData = {
  title: string;
  artist: string;
  description: string;
  image_data: string;
};
