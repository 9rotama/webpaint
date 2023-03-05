import NavButton from '@/ui/NavButton';

export default function GlobalNav() {
  return (
    <div>
      <NavButton href="/" text="home" />
      <NavButton href="/paint" text="paint" />
    </div>
  );
}
