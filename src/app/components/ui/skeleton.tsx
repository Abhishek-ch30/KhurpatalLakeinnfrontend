import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular' }) => {
  const baseClasses = 'animate-pulse bg-slate-200/50 backdrop-blur-sm';
  const variantClasses = {
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4 w-full',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
};

export const RoomCardSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm">
    <Skeleton className="h-64 rounded-[2rem] mb-6" />
    <div className="px-4 pb-4 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-12 rounded-lg" />
      </div>
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
      <div className="flex justify-between items-end mt-8">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-14 w-14 rounded-2xl" />
      </div>
    </div>
  </div>
);
