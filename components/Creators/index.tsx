'use client';
import { Container } from '../Container'
import Banner from './Banner'
import Forms from './Forms'

export default function Creators() {
  return (
    <section className='min-h-[100vh] flex justify-center items-center'>
      <Container padding>
        <Banner />
        <Forms />
      </Container>
    </section>
  )
}
