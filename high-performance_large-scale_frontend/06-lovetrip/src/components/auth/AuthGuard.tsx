import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

import { useSetRecoilState } from 'recoil'

import { auth } from '@/remote/firebase'
import { userAtom } from '@/store/atom/user'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      setUser(null)
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoUrl: user.photoURL ?? '',
      })

      setInitialize(true)
    }
  })

  if (initialize === false) {
    // 계정이 없는 경우 회원가입 먼저
    // return <SigninPage />
    return null
  }

  return <>{children}</>
}

export default AuthGuard