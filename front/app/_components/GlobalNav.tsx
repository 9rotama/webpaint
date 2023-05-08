'use client';

import NavButton from './NavButton';
import { usePathname } from 'next/navigation';
import { faImage, faPaintbrush } from '@fortawesome/free-solid-svg-icons';

export default function GlobalNav() {
  const pathname = usePathname();

  return (
    <div className="mb-5 flex justify-center border-b-2 p-2">
      <NavButton
        href="/"
        icon={faImage}
        text="gallery"
        isActive={pathname == '/'}
      />
      <NavButton
        href="/paint"
        icon={faPaintbrush}
        text="paint"
        isActive={pathname == '/paint'}
      />
    </div>
  );
}
