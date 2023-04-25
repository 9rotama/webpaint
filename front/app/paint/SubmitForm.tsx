import { useForm, SubmitHandler } from 'react-hook-form';
import { SubmitData } from './paint';

type Props = {
  exportCanvasImage: () => void;
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
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const img = exportCanvasImage();
    console.log({ ...data, img });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>title</label>
      <input type="text" {...register('title')}></input>
      <label>artist</label>
      <input type="text" {...register('artist')}></input>
      <label>description</label>
      <textarea rows={4} {...register('description')}></textarea>
      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
      >
        submit
      </button>
    </form>
  );
}
