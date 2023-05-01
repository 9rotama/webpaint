import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  icon: IconDefinition;
  isActive: boolean;
  handleClick: () => void;
};

export default function ToolButton({ icon, isActive, handleClick }: Props) {
  const bgColor = isActive ? 'bg-cyan-100' : 'hover:bg-gray-100';
  return (
    <div className={`${bgColor} rounded-xl p-3`} onClick={handleClick}>
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
    </div>
  );
}
