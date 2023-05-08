'use client';

import WorkPreviewCard from './WorkPreviewCard';
import WorkPreviewListLoading from './loading/WorkPreviewListLoading';
import { getWorkPreviewData } from '../../lib/api/getWorkPreviewData';

export default function WorkPreviewList() {
  const data = getWorkPreviewData();

  if (!data) {
    return <WorkPreviewListLoading />;
  } else {
    return (
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:p-10">
        {data?.map((e) => {
          return (
            <WorkPreviewCard
              key={e.id}
              image={e.image}
              id={e.id}
              title={e.title}
              artist={e.artist}
              likes={e.likes}
            />
          );
        })}
      </div>
    );
  }
}
