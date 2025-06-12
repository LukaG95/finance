'use client';

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {

  return (
    <div className='bg-white rounded-cardRadius p-cardPadding'>
      { children }
    </div>
  );
}