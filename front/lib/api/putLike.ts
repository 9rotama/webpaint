import axios from 'axios';

export const putLike = (id: number) => {
  const work_id = id;
  return () => {
    const put_url =
      process.env.NEXT_PUBLIC_API_URL + '/like/' + work_id.toString();
    axios.put(put_url);
  };
};
export const putRemoveLike = (id: number) => {
  const work_id = id;
  return () => {
    const put_url =
      process.env.NEXT_PUBLIC_API_URL + '/removelike/' + work_id.toString();
    axios.put(put_url);
  };
};
