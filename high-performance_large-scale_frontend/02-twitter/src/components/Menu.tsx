import { BsHouse } from 'react-icons/bs';
import { BiSearch, BiUserCircle } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdLogin, MdLogout } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useContext } from 'react';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';
import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';
import useTranslation from 'hooks/useTranslation';

export default function MenuList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();

  return (
    <div className="footer">
      <div className="footer__grid">
        <button
          type="button"
          className={location.pathname === '/' ? 'footer__btn-active' : ''}
          onClick={() => navigate('/')}
        >
          <BsHouse />
          <span className="footer__grid-text">{t('MENU_HOME')}</span>
        </button>
        <button
          type="button"
          className={
            location.pathname === '/profile' ? 'footer__btn-active' : ''
          }
          onClick={() => navigate('/profile')}
        >
          <BiUserCircle />
          <span className="footer__grid-text">{t('MENU_PROFILE')}</span>
        </button>
        <button
          type="button"
          className={
            location.pathname === '/search' ? 'footer__btn-active' : ''
          }
          onClick={() => navigate('/search')}
        >
          <BiSearch />
          <span className="footer__grid-text">{t('MENU_SEARCH')}</span>
        </button>
        <button
          type="button"
          className={
            location.pathname === '/notification' ? 'footer__btn-active' : ''
          }
          onClick={() => navigate('/notification')}
        >
          <IoMdNotificationsOutline />
          <span className="footer__grid-text">{t('MENU_NOTI')}</span>
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
            <span className="footer__grid-text">{t('MENU_LOGOUT')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
