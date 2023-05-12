import axios from 'axios';
import { useEffect, useState } from 'react';

export const getWorkData = (work_id: string) => {
  const [data, setData] = useState<Work>();
  const [error, setError] = useState(undefined);
  const [retryNum, setRetryNum] = useState(0);
  const get_url = process.env.NEXT_PUBLIC_API_URL + '/work/' + work_id;

  const retry = () => {
    setRetryNum(retryNum + 1);
  };

  useEffect(() => {
    setError(undefined);
    axios
      .get(get_url)
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  return { data, error, retry };
};
