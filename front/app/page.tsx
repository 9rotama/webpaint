'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WorkPreviewCard from './WorkPreviewCard';

export default function Page() {
  const [previewWorksData, setPreviewWorksData] = useState<WorkPreview[]>();

  useEffect(() => {
    const get_url = process.env.NEXT_PUBLIC_API_URL + '/discover/1';
    axios.get(get_url).then((response) => {
      const data = response.data.reverse();
      setPreviewWorksData(data);
    });
  }, []);
  return (
    <>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:p-10">
        {previewWorksData?.map((e) => {
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
    </>
  );
}
