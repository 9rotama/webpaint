import Link from 'next/link';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  href: string;
  icon: IconDefinition;
  text: string;
  isActive: boolean;
};

export default function NavButton({ href, icon, text, isActive }: Props) {
  const buttonStyle = isActive
    ? 'flex items-center gap-x-3 rounded-xl px-3 py-2 bg-gray-200'
    : 'flex items-center gap-x-3 rounded-xl px-3 py-2 hover:bg-gray-200';

  return (
    <Link href={href}>
      <div className={`${buttonStyle} transition-all`}>
        <FontAwesomeIcon icon={icon} />
        <h1>{text}</h1>
      </div>
    </Link>
  );
}
