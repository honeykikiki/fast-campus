import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import PostListPage from 'pages/posts';
import PostDetailPage from 'pages/posts/detail';
import PostNew from 'pages/posts/new';
import ProfilePage from 'pages/profile';
import LoginPage from 'pages/login';
import SignupPage from 'pages/signup';
import PostEdit from 'pages/posts/edit';

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
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} /> */}
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
