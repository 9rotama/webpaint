import WorkPreviewCardSkeleton from './WorkPreviewCardSkeleton';

export default function WorkPreviewListLoading() {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:p-10">
      {[...Array(20)].map((_, i) => (
        <WorkPreviewCardSkeleton key={i} />
      ))}
    </div>
  );
}
