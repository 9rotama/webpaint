import axios from 'axios';

import Likes from './Likes';

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
  const handleLike = () => {
    const put_url = process.env.NEXT_PUBLIC_API_URL + '/like/' + id.toString();
    axios.put(put_url);
  };
  const handleRemoveLike = () => {
    const put_url =
      process.env.NEXT_PUBLIC_API_URL + '/removelike/' + id.toString();
    axios.put(put_url);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img className="w-44 rounded-xl" src={image}></img>
      <h2>{title}</h2>
      <p className="text-sm text-gray-500">{artist}</p>
      <Likes
        num={likes}
        handleLike={handleLike}
        handleRemoveLike={handleRemoveLike}
      ></Likes>
    </div>
  );
}
