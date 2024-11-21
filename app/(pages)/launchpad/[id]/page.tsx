'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import {
  BsTwitterX,
  BsGlobe2,
  BsDiscord,
  BsTelegram,
  BsInstagram,
} from 'react-icons/bs'

const price = 0.0023

export default function LaunchPad({ params }: { params: { url: string } }) {
  const [count, setCount] = useState<number>(1)
  const { url } = params

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue)) {
      setCount(Number(inputValue))
    }
  }
  return (
    <div className='bg-background my-[100px] pt-[100px] flex items-center'>
      <div className='w-full flex justify-center'>
          <div className='grid w-3/4 md:w-1/2 grid-cols-1 px-8 md:grid-cols-2 gap-20'>
            <div className='w-full h-[400px] sm:h-[600px] bg-primary-DEFUAULT rounded-md overflow-hidden'>
              <Image
                src='https://static.unisat.io/content/cf9f195b6d56e6db56dd7faea74c642c869e0f93239dbf9772ee2aa194ec0c33i0'
                width={100}
                height={100}
                style={{ width: '100%', height: '100%' }}
                alt='Example'
              ></Image>
            </div>
            <div className='w-full flex flex-col justify-between gap-4'>
              <h2 className='text-4xl text-white'>{'Doge Ordinal'}</h2>
              <div className='flex gap-2 items-center'>
                <span className='bg-primary-DEFUAULT text-xl px-4 py-2 text-white rounded-lg '>
                  Total Supply {'1000'}
                </span>
                <div className='flex text-2xl items-center gap-3'>
                  <Link href='#'>
                    <BsGlobe2 className='cursor-pointer hover:text-white' />
                  </Link>
                  <Link href='#'>
                    <BsDiscord className='cursor-pointer hover:text-white' />
                  </Link>
                  <Link href='#'>
                    <BsTelegram className='cursor-pointer hover:text-white' />
                  </Link>
                  <Link href='#'>
                    <BsTwitterX className='cursor-pointer hover:text-white' />
                  </Link>
                  <Link href='#'>
                    <BsInstagram className='cursor-pointer hover:text-white' />
                  </Link>
                </div>
              </div>
              <div>
                <p className='text-lg'>
                  Doge Ordinals PFPs: Genesis Drop, Season 1 of 10. Unique
                  Bitcoin NFTs tied to Doge plushies. Claim yours! 100%
                  grassroots Doge project, 0 team allocation.
                </p>
              </div>
              <div className='bg-primary-DEFUAULT p-4 rounded-lg'>
                <p className='text-3xl text-white'>Price</p>
                <div className='flex items-center'>
                  <h3 className='text-2xl font-bold w-1/3'>${price * count}</h3>
                  <input
                    type='number'
                    step={1}
                    className='border-none w-2/3 text-2xl bg-transparent rounded-md p-2 outline-none text-right'
                    value={count}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button className='bg-[#f71f71] hover:bg-[#962651] overflow-hidden w-full text-2xl px-4 py-2 rounded-md text-white duration-200'>
                  Mint
                </button>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='h-4 rounded-md overflow-hidden w-full bg-primary-DEFUAULT'>
                  <div className='w-1/3 rounded-md bg-white h-full'></div>
                </div>
                <div className='flex justify-between text-lg '>
                  <span>Total Minted</span>
                  <div><span className='text-white mr-2'>33%</span>(333/1000)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
