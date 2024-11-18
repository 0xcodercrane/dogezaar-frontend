export function Container({
  children,
  maxWidth,
  bgColor,
  padding = false,
  paddingLeft = false,
  className,
  justify = 'center',
  direction = 'row',
}: {
  children: React.ReactNode
  maxWidth?: number
  bgColor?: string
  padding?: boolean
  paddingLeft?: boolean
  className?: string
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  direction?: 'row' | 'col'
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center ${bgColor || ''} ${
        padding ? 'px-4 md:px-16 lg:px-16 xl:px-16 2xl:px-0' : ''
      } ${paddingLeft ? 'pl-4 md:pl-16 lg:pl-16 xl:pl-16' : ''} ${
        justify ? `justify-${justify}` : 'justify-center'
      } ${direction ? `flex-${direction}` : 'flex-row'} ${
        className ? className : ''
      } `}
    >
      <div
        className={`w-full ${
          maxWidth ? `max-w-[${maxWidth}px]` : 'max-w-[--global-max-width]'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
