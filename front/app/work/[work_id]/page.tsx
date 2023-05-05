'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { handleLike, handleRemoveLike } from '../../handleLike';
import LikeButton from '../../../ui/LikeButton';

export default function ({ params }: { params: { work_id: string } }) {
  const [workData, setWorkData] = useState<Work>();

  const sectionStyle = 'text-xs text-slate-400 mt-2';

  const dateConvert = (jsonDate: string | undefined) => {
    if (jsonDate) {
      const date = new Date(Date.parse(jsonDate));
      return (
        date.toLocaleDateString() + ' ' + date.toLocaleTimeString().slice(0, -3)
      );
    }
    return undefined;
  };

  useEffect(() => {
    const get_url = process.env.NEXT_PUBLIC_API_URL + '/work/' + params.work_id;
    axios.get(get_url).then((response) => {
      setWorkData(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <img src={workData?.image} className="border-2 border-slate-300"></img>
      <p className={sectionStyle}>title</p>
      <h1 className="text-4xl">{workData?.title}</h1>
      <p className={sectionStyle}>artist</p>
      <p className="text-slate-600">{workData?.artist}</p>
      <p className={sectionStyle}>description</p>
      <p>{workData?.description}</p>
      <p className={sectionStyle}>post time</p>
      <p>{dateConvert(workData?.date)}</p>
      <LikeButton
        num={workData?.likes}
        handleLike={handleLike(parseInt(params.work_id))}
        handleRemoveLike={handleRemoveLike(parseInt(params.work_id))}
      />
    </div>
  );
}
