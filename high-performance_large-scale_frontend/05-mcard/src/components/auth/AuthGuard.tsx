import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '@/remote/firebase'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)

  onAuthStateChanged(auth, (user) => {
    console.log(user)

    setInitialize(true)
  })

  if (initialize === false) {
    return <div>인증처리중.....</div>
  }

  return <>{children}</>
}

export default AuthGuard
