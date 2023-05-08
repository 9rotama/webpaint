import axios from 'axios';
import { useEffect, useState } from 'react';

export const getWorkData = (work_id: string) => {
  const [data, setData] = useState<Work>();
  const get_url = process.env.NEXT_PUBLIC_API_URL + '/work/' + work_id;

  useEffect(() => {
    axios.get(get_url).then((response) => {
      setData(response.data);
    });
  }, []);

  return data;
};
