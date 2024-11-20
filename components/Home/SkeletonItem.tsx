export default function SkeletonItem() {
  return (
    <div className='flex items-center gap-4 my-2 py-2 pr-2'>
      <div className='w-[40px] bg-primary-DEFUAULT animate-pulse h-[40px] rounded-full'></div>
      <div className='h-[40px] w-full bg-primary-DEFUAULT animate-pulse rounded-md'></div>
    </div>
  )
}
