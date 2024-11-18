import { Container } from './Container'

export default function Header() {
  return (
    <header className='absolute top-0 w-full z-10'>
      <Container padding>
        <div className='flex justify-between items-center h-[--header-height] p-5 '>
          <div className='text-white text-lg text-[36px]'>
            <h1>Doginal Bot</h1>
          </div>
          <div className='border-2 rounded-md border-white px-3 py-2 text-white'>
            <button>Connect Wallet</button>
          </div>
        </div>
      </Container>
    </header>
  )
}
