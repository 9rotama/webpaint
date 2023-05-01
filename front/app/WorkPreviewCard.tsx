import Likes from './Likes';

type Props = {
  image: string;
  title: string;
  artist: string;
  likes: number;
};

export default function WorkPreviewCard({
  image,
  title,
  artist,
  likes,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        className="w-44 rounded-xl"
        src="https://i.ibb.co/9t4GstJ/1.png"
        /*tmp image*/
      ></img>
      <h2>{title}</h2>
      <p className="text-sm text-gray-500">{artist}</p>
      <Likes num={likes}></Likes>
    </div>
  );
}
