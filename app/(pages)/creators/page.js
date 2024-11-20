'use client'
import { Container } from '@/components/Container'
import Forms from '@/components/Creators/Forms'

export default function Creators() {
  return (
    <div className='h-hull bg-background py-[100px]'>
      <div className='h-full w-full'>
        <Container padding>
          <Forms />
        </Container>
      </div>
    </div>
  )
}
