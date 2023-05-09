import Link from 'next/link';
import { putLike, putRemoveLike } from '../../lib/api/putLike';
import LikeButton from '../../ui/LikeButton';

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
      <LikeButton id={id} num={likes}></LikeButton>
    </div>
  );
}
