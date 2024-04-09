import { useCallback } from 'react'
import Form from '@/components/signin/Form'
import { FormValues } from '@/models/signin'

function SignInPage() {
  const handleSubmit = useCallback((formValues: FormValues) => {
    console.log(formValues)
  }, [])

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignInPage
