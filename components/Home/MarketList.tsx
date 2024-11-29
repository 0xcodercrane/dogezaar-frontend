import { useState } from 'react'
import { TMarketlist } from '@/types/marketlists.type'
import MarketListItem from './MarketListItem'
import SkeletonItem from './SkeletonItem'

const floorPeriodLists = [
  { label: '10m' },
  { label: '1h' },
  { label: '6h' },
  { label: '1d' },
  { label: '7d' },
  { label: '30d' },
]

export default function CollectionList({
  marketlists,
}: {
  marketlists: TMarketlist[]
}) {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [floorPeriod, setFloorPeriod] = useState<string>('1d')

  return (
    <div className='p-6'>
      <div className='my-10 flex flex-col justify-between md:flex-row items-center'>
        <h2 className='font-bold w-full md:w-[30%] text-4xl'>Recent Collections</h2>
        <div className='w-full md:w-[30%] flex gap-2 justify-start md:justify-end'>
          {floorPeriodLists.map((item, index) => (
            <span
              className={`${
                floorPeriod === item.label
                  ? 'bg-gray-600'
                  : 'bg-primary-DEFUAULT'
              } rounded-md px-4 py-2 cursor-pointer hover:bg-gray-600`}
              onClick={() => setFloorPeriod(item.label)}
              key={index}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <div className='flex flex-wrap text-right font-bold text-xl'>
        <div className='w-[2%] hidden sm:block pr-2'>#</div>
        <div className='w-[57%] sm:w-[33%] text-left'>Collection</div>
        <div className='w-[15%] sm:w-[10%]'>Floor</div>
        <div className='w-[10%] hidden sm:block'>Floor {floorPeriod}%</div>
        <div className='w-[15%] hidden sm:block'>Volume</div>
        <div className='w-[15%] hidden sm:block'>Sales</div>
        <div className='w-[25%] sm:w-[15%]'>Listing</div>
      </div>
      {marketlists.length > 0
        ? marketlists
            .slice(0, itemsPerPage)
            .map((marketlist, index) => (
              <MarketListItem key={index} marketlist={marketlist} />
            ))
        : Array.from({ length: 4 }).map((_, index) => (
            <SkeletonItem key={index} />
          ))}
      <div className='flex items-center gap-4'>
        <p>Shop Top:</p>
        <div className='flex justify-center items-center gap-3'>
          <span
            className={`px-3 cursor-pointer rounded-md py-2 w-[50px] ${
              itemsPerPage === 10 ? 'bg-gray-600' : 'bg-primary-DEFUAULT'
            } hover:bg-gray-600`}
            onClick={() => setItemsPerPage(10)}
          >
            10
          </span>
          <span
            className={`px-3 cursor-pointer rounded-md py-2 w-[50px] ${
              itemsPerPage === 20 ? 'bg-gray-600' : 'bg-primary-DEFUAULT'
            } hover:bg-gray-600`}
            onClick={() => setItemsPerPage(20)}
          >
            20
          </span>
          <span
            className={`px-3 cursor-pointer rounded-md py-2 w-[50px] ${
              itemsPerPage === 40 ? 'bg-gray-600' : 'bg-primary-DEFUAULT'
            } hover:bg-gray-600`}
            onClick={() => setItemsPerPage(40)}
          >
            40
          </span>
          <span
            className={`px-3 cursor-pointer rounded-md py-2 w-[50px] ${
              itemsPerPage === 100 ? 'bg-gray-600' : 'bg-primary-DEFUAULT'
            } hover:bg-gray-600`}
            onClick={() => setItemsPerPage(100)}
          >
            100
          </span>
        </div>
      </div>
    </div>
  )
}
