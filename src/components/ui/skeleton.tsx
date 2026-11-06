import * as React from 'react';

export function Skeleton({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[#E8DFD0]/60 dark:bg-[#1A4C3E]/50 ${className}`}
      {...props}
    />
  );
}

