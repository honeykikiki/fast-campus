import { useState } from 'react';
import Router from './components/Router';
import { app } from 'firebaseApp';
import { getAuth } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const auth = getAuth(app);
  const [isAuth, setIsAuth] = useState<boolean>(!!auth?.currentUser);

  return (
    <>
      <Router isAuth={isAuth} />
      <ToastContainer />
    </>
  );
}

export default App;
