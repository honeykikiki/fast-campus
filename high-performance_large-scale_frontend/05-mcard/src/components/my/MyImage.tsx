import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ChangeEvent } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atom/user'
import { COLLECTIONS } from '@/constants'
import useUser from '@/hooks/auth/useUser'
import { app, storage, store } from '@/remote/firebase'

type Mode = 'upload' | 'default'

function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: Mode
}) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const currentUser = getAuth(app).currentUser

    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)
    try {
      const uploaded = await uploadBytes(storageRef, files[0])

      // 스토리지에 이미지 추가
      const downloadUrl = await getDownloadURL(uploaded.ref)

      // 인증된 유저 정보에 photoURL 추가
      await updateProfile(currentUser, {
        photoURL: downloadUrl,
      })

      // 데이터 베이스에 photoURL 수정
      await updateDoc(
        doc(collection(store, COLLECTIONS.USER), currentUser.uid),
        {
          photoURL: downloadUrl,
        },
      )

      setUser({
        ...user,
        photoURL: downloadUrl,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        width={size}
        height={size}
        alt="유저의 이미지"
      />
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export default MyImage
