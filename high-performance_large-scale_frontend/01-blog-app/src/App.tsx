import { useEffect, useState, useContext } from 'react';
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from './components/Router';
import Loader from 'components/Loader';
import ThemeContext from 'context/ThemeContext';

function App() {
  const context = useContext(ThemeContext);
  const auth = getAuth(app);
  const [init, setInit] = useState(false); // auth를 체크하기 전에 (initialize 전)에는 로더를 띄워주는 용도
  const [isAuth, setIsAuth] = useState<boolean>(!!auth?.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <div className={context.theme === 'light' ? 'white' : 'dark'}>
      <ToastContainer />
      {init ? <Router isAuth={isAuth} /> : <Loader />}
    </div>
  );
}

export default App;
