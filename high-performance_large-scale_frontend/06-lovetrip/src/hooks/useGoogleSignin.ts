import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLLECTION } from '@/constants'
import { auth, store } from '@/remote/firebase'

function useGoogleSignin() {
  const nav = useNavigate()
  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()

    try {
      const { user } = await signInWithPopup(auth, provider)
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTION.USER), user.uid),
      )

      if (userSnapshot.exists()) {
        nav('/')
      } else {
        const 새로운유저 = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }

        await setDoc(
          doc(collection(store, COLLECTION.USER), user.uid),
          새로운유저,
        )

        nav('/')
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/popup-closed-by-user') {
          return
        }
      }

      throw new Error('fail to signin')
    }
  }, [nav])

  const signout = useCallback(() => {
    signOut(auth)
  }, [])

  return {
    signin,
    signout,
  }
}

export default useGoogleSignin
