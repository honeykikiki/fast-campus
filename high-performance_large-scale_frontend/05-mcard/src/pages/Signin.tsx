import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '@/components/signin/Form'
import { useAlertContext } from '@/contexts/AlertContext'
import { FormValues } from '@/models/signin'
import { auth } from '@/remote/firebase'

function SignInPage() {
  const { open } = useAlertContext()
  const nav = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        const response = await signInWithEmailAndPassword(auth, email, password)

        if (response.user !== null) {
          nav('/')
        }
      } catch (e) {
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/invalid-credential') {
            open({
              title: '계정의 정보 다시 확인해주세요.',
              onButtonClick: () => {},
            })

            return
          }

          open({
            title: '잠시후 다시 시도해주세요.',
            onButtonClick: () => {},
          })
        }
      }
    },
    [nav, open],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignInPage
