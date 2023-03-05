type Props = {
  text: string;
};

export default function NavButton({ text }: Props) {
  return (
    <button className="rounded-xl px-3 py-2 hover:bg-gray-200">{text}</button>
  );
}
