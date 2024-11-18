export default function Button({ content }: { content: string }) {
  return (
    <div className='border-2 rounded-md border-primary px-3 py-2'>
      <button>{content}</button>
    </div>
  )
}
