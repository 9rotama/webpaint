'use client';

import LikeButton from '../../../ui/LikeButton';
import { getWorkData } from '../../../lib/api/getWorkData';
import { dateConvert } from '@/lib/utils/dateConvert';

export default function ({ params }: { params: { work_id: string } }) {
  const data = getWorkData(params.work_id);

  const sectionStyle = 'text-xs text-slate-400 mt-2';

  if (!data) {
    <div>loading...</div>;
  } else {
    return (
      <div className="flex animate-opaque flex-col items-center justify-center gap-2 text-center ">
        <img src={data?.image} className="border-2 border-slate-300"></img>
        <p className={sectionStyle}>title</p>
        <h1 className="text-4xl">{data?.title}</h1>
        <p className={sectionStyle}>artist</p>
        <p className="text-slate-600">{data?.artist}</p>
        <p className={sectionStyle}>description</p>
        <p>{data?.description}</p>
        <p className={sectionStyle}>post time</p>
        <p>{dateConvert(data?.date)}</p>
        {data ? <LikeButton id={data.id} num={data.likes} /> : <></>}
      </div>
    );
  }
}
