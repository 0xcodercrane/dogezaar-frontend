import { TMarketlist } from '@/types/marketlists.type'
import Image from 'next/image'

export default function MarketListItem(props: { marketlist: TMarketlist }) {
  const { marketlist } = props
  return (
    <div className='flex flex-wrap items-center text-right my-2 py-2 pr-2 cursor-pointer  hover:bg-primary-DEFUAULT bg-transparent rounded-md duration-200'>
      <div className='w-[2%] hidden sm:block pr-2'>{marketlist.id}</div>
      <div className='w-[57%] sm:w-[33%] text-left flex items-center gap-2'>
        <Image
          alt={marketlist.name}
          width={40}
          height={40}
          style={{ width: '40px', height: '40px' }}
          className='rounded-full'
          src={marketlist.imageURL}
        ></Image>
        {marketlist.name}
      </div>
      <div className='w-[15%] sm:w-[10%]'>${marketlist.floor.toFixed(2)}</div>
      <div
        className={`w-[10%] hidden sm:block ${
          marketlist.floorPct > 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {marketlist.floorPct.toFixed(2)}%
      </div>
      <div className='w-[15%] hidden sm:block'>${marketlist.volume.toFixed(2)}</div>
      <div className='w-[15%] hidden sm:block'>{marketlist.sales}</div>
      <div className='w-[25%] sm:w-[15%]'>{marketlist.listed}</div>
    </div>
  )
}
