import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Form from '@/components/signup/Form'
import { COLLECTIONS } from '@/constants'
import { FormValues } from '@/models/signup'
import { auth, store } from '@/remote/firebase'

function SignupPage() {
  const nav = useNavigate()
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      updateProfile(user, {
        displayName: name,
      })

      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: name,
      }

      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

      nav('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage
