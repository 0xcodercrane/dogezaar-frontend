import { Container } from './Container'

export default function Header() {
  return (
    <header className='absolute top-0 w-full z-10'>
      <Container padding>
        <div className='flex justify-between items-center h-[--header-height] p-5 '>
          <div className='text-lg font-bold text-[36px]'>
            <h1>Doginal Bot</h1>
          </div>
          <div className='border-2 rounded-md border-primary px-3 py-2'>
            <button>Connect Wallet</button>
          </div>
        </div>
      </Container>
    </header>
  )
}
