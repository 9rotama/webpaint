import Image from 'next/image';

type Props = {
  handleRetry: () => void;
};

export default function Error({ handleRetry }: Props) {
  return (
    <>
      <title>error</title>
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/crying_face.png"
          alt="loudly_crying_face_3d"
          width="120"
          height="120"
          priority={true}
          className="drop-shadow-xl"
        />
        <p className="text-xl">something went wrong...</p>
        <button
          className="mt-3 rounded-xl bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-700"
          onClick={() => {
            handleRetry();
          }}
        >
          try again
        </button>
      </div>
    </>
  );
}
