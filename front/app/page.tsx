import { Suspense } from 'react';
import WorkPreviewList from './WorkPreviewList';
import WorkPreviewListLoading from './loading/WorkPreviewListLoading';

export default function Page() {
  return (
    <div className="animate-opaque">
      <Suspense fallback={<WorkPreviewListLoading />}>
        <WorkPreviewList />
      </Suspense>
    </div>
  );
}
