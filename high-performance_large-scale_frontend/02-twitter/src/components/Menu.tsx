import { BsHouse } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { MdLogin, MdLogout } from 'react-icons/md';
import { useContext } from 'react';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';
import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';

export default function MenuList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate('/')}>
          <BsHouse />
          Home
        </button>
        <button type="button" onClick={() => navigate('/profile')}>
          <BiUserCircle />
          Profile
        </button>
        {user === null ? (
          <button type="button" onClick={() => navigate('/user/login')}>
            <MdLogin />
            Login
          </button>
        ) : (
          <button
            type="button"
            onClick={async () => {
              const auth = getAuth(app);
              await signOut(auth);
              toast.success('로그아웃 성공');
            }}
          >
            <MdLogout />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
