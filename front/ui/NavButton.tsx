import Link from 'next/link';

type Props = {
  href: string;
  text: string;
};

export default function NavButton({ href, text }: Props) {
  return (
    <Link href={href} className="rounded-xl px-3 py-2 hover:bg-gray-200">
      {text}
    </Link>
  );
}
