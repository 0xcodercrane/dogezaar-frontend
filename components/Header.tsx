import { Container } from './Container'
import Button from './UI/Button'

export default function Header() {
  return (
    <header className='absolute top-0 w-full z-10'>
      <Container padding>
        <div className='flex justify-between items-center h-[--header-height] p-5 '>
          <div className='text-lg font-bold text-[42px]'>
            <h1>Doginal Bot</h1>
          </div>
          <Button content='Connect Wallet' />
        </div>
      </Container>
    </header>
  )
}
