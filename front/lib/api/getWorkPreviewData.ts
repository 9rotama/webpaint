import { useEffect, useState } from 'react';
import axios from 'axios';

export const getWorkPreviewData = () => {
  const [data, setData] = useState<WorkPreview[]>();
  const get_url = process.env.NEXT_PUBLIC_API_URL + '/discover/1';

  useEffect(() => {
    axios.get(get_url).then((response) => {
      const data = response.data.reverse();
      setData(data);
    });
  }, []);

  return data;
};
