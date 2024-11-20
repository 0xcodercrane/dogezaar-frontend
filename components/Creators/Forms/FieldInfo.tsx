import type { FieldApi } from '@tanstack/react-form'

export default function FieldInfo({
  field,
}: {
  field: FieldApi<any, any, any, any>
}) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>
          {field.state.meta.errors.map((error, index) => (
            <span className='text-sm text-red-600' key={index}>
              {error}
              <br />
            </span>
          ))}
        </em>
      ) : null}
    </>
  )
}
