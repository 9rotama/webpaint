import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  icon: IconDefinition;
  isActive: boolean;
  handleClick: () => void;
};

export default function ToolButton({ icon, isActive, handleClick }: Props) {
  const bgStyle = isActive ? 'bg-blue-100' : 'hover:bg-gray-100';

  return (
    <div
      className={`h-10 w-10 ${bgStyle} flex items-center justify-center rounded-xl`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
    </div>
  );
}
