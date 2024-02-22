import AuthContext from 'context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const onLogout = async () => {
  const auth = getAuth(app);
  try {
    await signOut(auth);
    toast.success('로그아웃');
  } catch (error: any) {
    console.log(error);
    toast.error(error.code);
  }
};

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image"></div>
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">{user?.displayName ?? '사용자'}</div>
        </div>
      </div>
      <div role="presentation" className="profile__logout" onClick={onLogout}>
        로그아웃
      </div>
    </div>
  );
}
