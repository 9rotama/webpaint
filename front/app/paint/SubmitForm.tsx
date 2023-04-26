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

  const onSubmit: SubmitHandler<Inputs> = (formData: Inputs) => {
    const img = exportCanvasImage();
    if (img) {
      const post_url = process.env.NEXT_PUBLIC_API_URL + '/post';
      const params: SubmitData = { ...formData, image_data: img };

      axios.post(post_url, params).then((response) => {
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
