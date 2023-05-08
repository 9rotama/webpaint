import { useSubmitForm } from '@/lib/hooks/useSubmitForm';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  show: boolean;
  exportCanvasImage: () => string | undefined;
  handleClose: () => void;
};

export default function SubmitFormModal({
  show,
  exportCanvasImage,
  handleClose,
}: Props) {
  const { register, handleSubmit, onSubmit } = useSubmitForm(
    exportCanvasImage,
    handleClose,
  );

  const labelStyle = 'w-32 text-right';
  const formStyle =
    'transition-all bg-slate-200 appearance-none border-2 border-gray-200 w-full rounded-lg p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500';

  if (show) {
    return (
      <div
        id="overlay"
        className="fixed top-0 left-0 h-full w-full bg-slate-900 bg-opacity-20"
      >
        <div className="m-auto mt-4 max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
          <button
            onClick={handleClose}
            className="flex items-center gap-x-3 rounded-full px-3 py-2 transition-all hover:bg-gray-200"
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
              className="mt-3 rounded-xl bg-blue-600 px-3 py-2 text-white transition-all hover:bg-blue-700"
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
