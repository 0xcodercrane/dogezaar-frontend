import { Container } from '@/components/Container'

export default function Home() {
  return (
    <div className='h-hull bg-slate-700'>
      <div className='h-full w-full'>
        <Container>
          <div className='text-4l flex h-[100dvh] flex-col items-center justify-center'>
            <h1 className='mb-4 p-4 text-6xl font-bold'>
              <span className='bg-gradient-to-r from-ob-blue to-ob-green bg-clip-text text-transparent'>
                Trio.xyz
              </span>{' '}
              is coming soon
            </h1>
          </div>
        </Container>
      </div>
    </div>
  )
}
