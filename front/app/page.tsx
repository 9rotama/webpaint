'use client';
import { Metadata } from 'next';
import WorkPreviewList from './_components/WorkPreviewList';

export const metadata: Metadata = {
  title: 'work',
};

export default function Page() {
  return (
    <>
      <title>gallery</title>
      <div className="animate-opaque">
        <WorkPreviewList />
      </div>
    </>
  );
}
