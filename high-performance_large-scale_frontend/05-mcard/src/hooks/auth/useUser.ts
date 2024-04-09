import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atom/user'

function useUser() {
  return useRecoilValue(userAtom)
}

export default useUser
