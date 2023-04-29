import { useForm, SubmitHandler } from 'react-hook-form';
import { SubmitData } from './paint';
import axios from 'axios';

type Props = {
  exportCanvasImage: () => string | undefined;
};

type Inputs = {
  title: string;
  artist: string;
  description: string;
};

export default function SubmitForm({ exportCanvasImage }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const post_url = process.env.NEXT_PUBLIC_API_URL + '/post';

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    const img = exportCanvasImage();
    if (img) {
      // Data URLをBlobに変換する
      const byteString = atob(img.split(',')[1]);
      const mimeString = img.split(',')[0].split(':')[1].split(';')[0];
      const buffer = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        buffer[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([buffer], { type: mimeString });

      const formData = new FormData();
      formData.append('image', blob, 'image.webp');
      formData.append('title', inputs.title);
      formData.append('artist', inputs.artist);
      formData.append('description', inputs.description);

      axios
        .post(post_url, formData, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then((response) => {
          console.log('body:', response.data);
        });
    } else {
      /*画像データが取れなかった際のエラー処理*/
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>title</label>
      <input
        type="text"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        {...register('title', { required: true })}
      ></input>
      <label>artist</label>
      <input
        type="text"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        {...register('artist', { required: true })}
      ></input>
      <label>description</label>
      <textarea
        rows={4}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        {...register('description')}
      ></textarea>
      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
      >
        submit
      </button>
    </form>
  );
}
