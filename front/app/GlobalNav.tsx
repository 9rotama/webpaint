'use client';

import NavButton from '@/ui/NavButton';
import { usePathname } from 'next/navigation';
import { faImage, faPaintbrush } from '@fortawesome/free-solid-svg-icons';

export default function GlobalNav() {
  const pathname = usePathname();

  return (
    <div className="m-2 mb-10 flex justify-center">
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
