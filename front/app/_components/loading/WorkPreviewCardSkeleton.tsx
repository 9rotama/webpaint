export default function WorkPreviewCardSkeleton() {
  const loadingAnimationStyle =
    'bg-gradient-to-r from-slate-100 from-10% via-slate-200 via-18% to-slate-100 to-30% shine-animate';

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <div
        className={`h-36 w-36 rounded-xl sm:h-44 sm:w-44 ${loadingAnimationStyle}`}
      />

      <div className={`h-4 w-20 rounded-full ${loadingAnimationStyle}`} />
      <div className={`h-4 w-10 rounded-full ${loadingAnimationStyle}`} />
      <div
        className={`flex h-6 w-12 items-center gap-1 rounded-lg pl-2 pr-2 ${loadingAnimationStyle}`}
      />
    </div>
  );
}
