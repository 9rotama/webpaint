import { RgbColor } from '@hello-pangea/color-picker';

type ToolSettings = {
  penSize: number;
  penColor: RgbColor;
  activeTool: string;
};

type Tool = {
  name: string;
  icon: IconDefinition;
};
