import { useForm, SubmitHandler } from 'react-hook-form';
import { postWorkData } from '@/lib/api/postWorkData';
import { dataURLToBlob } from '@/lib/utils/dataURLToBlob';

type Inputs = {
  title: string;
  artist: string;
  description: string;
};

export const useSubmitForm = (
  exportCanvasImage: () => string | undefined,
  handleClose: () => void,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    const img = exportCanvasImage();
    if (img) {
      const imgBlob = dataURLToBlob(img);
      postWorkData(imgBlob, inputs.title, inputs.artist, inputs.description);
      handleClose();
    } else {
      /*画像データが取れなかった際のエラー処理*/
    }
  };

  return { register, handleSubmit, onSubmit };
};
