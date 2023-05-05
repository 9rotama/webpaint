import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  show: boolean;
  exportCanvasImage: () => string | undefined;
  handleClose: () => void;
};

type Inputs = {
  title: string;
  artist: string;
  description: string;
};

export default function SubmitFormModal({
  show,
  exportCanvasImage,
  handleClose,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const post_url = process.env.NEXT_PUBLIC_API_URL + '/post';

  const labelStyle = 'w-32 text-right';
  const formStyle =
    'bg-slate-200 appearance-none border-2 border-gray-200 w-full rounded-lg p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500';

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

      handleClose();
    } else {
      /*画像データが取れなかった際のエラー処理*/
    }
  };

  if (show) {
    return (
      <div
        id="overlay"
        className="fixed top-0 left-0 h-full w-full bg-slate-900 bg-opacity-20"
      >
        <div className="m-auto mt-4 max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
          <button
            onClick={handleClose}
            className="flex items-center gap-x-3 rounded-xl px-3 py-2 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-5">
              <label className={labelStyle}>title</label>
              <input
                type="text"
                className={formStyle}
                {...register('title', { required: true })}
              ></input>
            </div>
            <div className="flex items-center gap-5">
              <label className={labelStyle}>artist</label>
              <input
                type="text"
                className={formStyle}
                {...register('artist', { required: true })}
              ></input>
            </div>
            <div className="flex items-center gap-5">
              <label className={labelStyle}>description</label>
              <textarea
                rows={4}
                className={formStyle}
                {...register('description')}
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-3 rounded-xl bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
