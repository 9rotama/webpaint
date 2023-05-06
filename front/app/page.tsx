'use client';
import { Suspense } from 'react';
import WorkPreviewList from './WorkPreviewList';

export default function Page() {
  return (
    <div className="animate-opaque">
      <WorkPreviewList />
    </div>
  );
}
