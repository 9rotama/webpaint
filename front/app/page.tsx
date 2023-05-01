'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WorkPreviewCard from './WorkPreviewCard';
import Likes from './Likes';

export default function Page() {
  const [previewWorksData, setPreviewWorksData] = useState<WorkPreview[]>();

  useEffect(() => {
    const get_url = process.env.NEXT_PUBLIC_API_URL + '/discover/1';
    axios.get(get_url).then((response) => {
      setPreviewWorksData(response.data);
    });
  }, []);
  return (
    <>
      <div className="flex">
        {previewWorksData?.map((e) => {
          return (
            <WorkPreviewCard
              image={e.image}
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
