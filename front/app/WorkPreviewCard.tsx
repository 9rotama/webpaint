import Link from 'next/link';
import { handleLike, handleRemoveLike } from './handleLike';
import LikeButton from './LikeButton';

type Props = {
  image: string;
  id: number;
  title: string;
  artist: string;
  likes: number;
};

export default function WorkPreviewCard({
  image,
  id,
  title,
  artist,
  likes,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Link href={'work/' + id.toString()}>
        <img
          className="w-36 rounded-xl border-2 border-slate-300 sm:w-44"
          src={image}
        ></img>
      </Link>

      <h2>{title}</h2>
      <p className="text-sm text-gray-500">{artist}</p>
      <LikeButton
        num={likes}
        handleLike={handleLike(id)}
        handleRemoveLike={handleRemoveLike(id)}
      ></LikeButton>
    </div>
  );
}
