import { TCollection } from '@/types/collections.type'
import CollectionListItem from './CollectionListItem'

export default function CollectionList({
  collections,
}: {
  collections: TCollection[]
}) {
  console.log(collections)
  return (
    <div className='p-6'>
      <div className='my-10 flex justify-between items-center'>
        <h2 className='font-bold text-4xl'>Recent Collections</h2>
        <div className='w-[30%] flex gap-2 justify-end'>
          <span className='bg-primary-DEFUAULT rounded-md px-4 py-2 cursor-pointer hover:bg-gray-600'>
            10m
          </span>
          <span className='bg-primary-DEFUAULT rounded-md px-4 py-2 cursor-pointer hover:bg-gray-600'>
            1h
          </span>
          <span className='bg-primary-DEFUAULT rounded-md px-4 py-2 cursor-pointer hover:bg-gray-600'>
            6h
          </span>
          <span className='bg-primary-DEFUAULT rounded-md px-4 py-2 cursor-pointer hover:bg-gray-600'>
            1d
          </span>
          <span className='bg-primary-DEFUAULT rounded-md px-4 py-2 cursor-pointer hover:bg-gray-600'>
            7d
          </span>
          <span className='bg-primary-DEFUAULT rounded-md px-4 py-2 cursor-pointer hover:bg-gray-600'>
            30d
          </span>
        </div>
      </div>
      <div className='flex flex-wrap text-right font-bold text-xl'>
        <div className='w-[5%] pr-2'>#</div>
        <div className='w-[30%] text-left'>Collection</div>
        <div className='w-[10%]'>Floor</div>
        <div className='w-[10%]'>Floor 1d%</div>
        <div className='w-[15%]'>Volume</div>
        <div className='w-[15%]'>Sales</div>
        <div className='w-[15%]'>Listing</div>
      </div>
      {collections.map((collection, index) => (
        <CollectionListItem key={index} collection={collection} />
      ))}
    </div>
  )
}
