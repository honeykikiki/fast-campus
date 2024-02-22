import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import PostListPage from '../pages/postes';
import PostDetailPage from '../pages/postes/detail';
import PostNew from '../pages/postes/new';
import PostEdit from '../pages/postes/edit';
import ProfilePage from '../pages/profile';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';

interface RouterProps {
  isAuth: boolean;
}

export default function Router({ isAuth }: RouterProps) {
  return (
    <>
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/posts/new" element={<PostNew />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* <Route path="*" element={<LoginPage />} /> */}
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}
