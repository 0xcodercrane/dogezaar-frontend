import { TCollection } from '@/types/collections.type'
import Image from 'next/image'

export default function CollectionListItem(props: { collection: TCollection }) {
  const { collection } = props
  return (
    <div className='flex flex-wrap items-center text-right my-2 py-2 pr-2 cursor-pointer  hover:bg-primary-DEFUAULT bg-transparent'>
      <div className='w-[5%] pr-2'>{collection.id}</div>
      <div className='w-[30%] text-left flex items-center gap-2'>
        <Image
          alt={collection.name}
          width={0}
          height={0}
          style={{ width: '40px', height: '40px' }}
          className='rounded-full'
          src={collection.imageURL}
        ></Image>
        {collection.name}
      </div>
      <div className='w-[10%]'>${collection.floor.toFixed(2)}</div>
      <div
        className={`w-[10%] ${
          collection.floorPct > 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {collection.floorPct.toFixed(2)}%
      </div>
      <div className='w-[15%]'>${collection.volume.toFixed(2)}</div>
      <div className='w-[15%]'>{collection.sales}</div>
      <div className='w-[15%]'>{collection.listed}</div>
    </div>
  )
}
