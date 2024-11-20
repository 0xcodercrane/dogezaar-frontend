'use client'
import { useState, useEffect } from 'react'
import { Container } from '@/components/Container'
import CollectionCarousel from '@/components/Home/CollectionCarousel'
import CollectionList from '@/components/Home/CollectionList'
import { AxiosInstance } from '@/utils/axios'
import { TCollection } from '@/types/collections.type'


export default function Home() {
  const [collections, setCollections] = useState<TCollection[]>([])

  const fetchCollections = async () => {
    try {
      const response = await AxiosInstance.get('/collections')
      setCollections(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [])

  return (
    <div className='h-hull bg-background py-[100px]'>
      <div className='h-full w-full'>
        <Container padding>
          <CollectionCarousel />
          <CollectionList collections={collections} />
        </Container>
      </div>
    </div>
  )
}
