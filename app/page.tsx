import { Container } from '@/components/Container'
import Creators from '@/components/Creators'

export default function Home() {
  return (
    <div className='h-hull bg-background'>
      <div className='h-full w-full'>
        <Container padding>
          <Creators />
        </Container>
      </div>
    </div>
  )
}
