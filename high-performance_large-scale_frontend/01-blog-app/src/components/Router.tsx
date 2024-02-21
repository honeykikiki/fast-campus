import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import PostListPage from '../pages/postes';
import PostDetailPage from '../pages/postes/detail';
import PostNew from '../pages/postes/new';
import PostEdit from '../pages/postes/edit';
import ProfilePage from '../pages/profile';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts" element={<PostListPage />}></Route>
        <Route path="/posts/:id" element={<PostDetailPage />}></Route>
        <Route path="/posts/new" element={<PostNew />}></Route>
        <Route path="/posts/edit/:id" element={<PostEdit />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="*" element={<Navigate replace to="/" />}></Route>
      </Routes>
    </>
  );
}
