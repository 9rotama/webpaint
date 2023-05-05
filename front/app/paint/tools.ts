import {
  faPen,
  faEraser,
  faEyeDropper,
  faFillDrip,
} from '@fortawesome/free-solid-svg-icons';
import { Tool } from './paint';

export const Tools: Tool[] = [
  {
    name: 'Pen',
    icon: faPen,
  },
  {
    name: 'Eraser',
    icon: faEraser,
  },
  {
    name: 'Dropper',
    icon: faEyeDropper,
  },
  {
    name: 'Fill',
    icon: faFillDrip,
  },
];
