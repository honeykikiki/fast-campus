import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>home Page</h1>} />
      {/* posts */}
      <Route path="/posts" element={<h1>posts list Page</h1>} />
      <Route path="/posts/:id" element={<h1>posts detail Page</h1>} />
      <Route path="/posts/new" element={<h1>posts new Page</h1>} />
      <Route path="/posts/edit/:id" element={<h1>posts edit Page</h1>} />
      {/* profile */}
      <Route path="/profile" element={<h1>profile Page</h1>} />
      <Route path="/profile/edit" element={<h1>profile edit Page</h1>} />
      {/* notification */}
      <Route path="/notification" element={<h1>notification Page</h1>} />
      {/* search */}
      <Route path="/search" element={<h1>search Page</h1>} />
      {/* users */}
      <Route path="/users/login" element={<h1>login Page</h1>} />
      <Route path="/users/signup" element={<h1>signup Page</h1>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
