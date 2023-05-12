import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

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

  const [errorMsg, setErrorMsg] = useState<string>();

  const handleErrorMsg = (s: string) => {
    setErrorMsg(s);
  };

  const onSubmit: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    const img = exportCanvasImage();
    if (img) {
      const imgBlob = dataURLToBlob(img);
      try {
        const res = await postWorkData(
          imgBlob,
          inputs.title,
          inputs.artist,
          inputs.description,
        );
        if (res.message == 'ok') {
          console.log('post success');
          handleClose();
          handleErrorMsg('');
        } else {
          handleErrorMsg('failed to submit. please try again');
        }
      } catch {
        handleErrorMsg('failed to submit. please try again');
      }
    } else {
      handleErrorMsg('failed to acquire image data. please try again');
      return;
    }
  };

  return { errorMsg, register, handleSubmit, onSubmit };
};
