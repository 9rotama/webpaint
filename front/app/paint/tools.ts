import {
  faPen,
  faEraser,
  faEyeDropper,
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
];
