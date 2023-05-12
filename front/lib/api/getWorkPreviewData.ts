import { useEffect, useState } from 'react';
import axios from 'axios';

export const getWorkPreviewData = () => {
  const [data, setData] = useState<WorkPreview[]>();
  const [error, setError] = useState();
  const [retryNum, setRetryNum] = useState(0);
  const get_url = process.env.NEXT_PUBLIC_API_URL + '/discover/1';

  const retry = () => {
    setRetryNum(retryNum + 1);
  };

  useEffect(() => {
    setError(undefined);
    axios
      .get(get_url)
      .then((response) => {
        const data = response.data.reverse();
        setData(data);
      })
      .catch((e) => {
        setError(e);
      });
  }, [retryNum]);

  return { data, error, retry };
};
