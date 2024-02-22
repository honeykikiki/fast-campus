import AuthContext from 'context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = 'all' | 'my';

export interface PostProps {
  id?: string;
  title: string;
  summary: string;
  content: string;
  email: string;
  created: string;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTap, setActiveTap] = useState<TabType>('all');
  const [posts, setPosts] = useState<PostProps[]>([]);
  const getPosts = async () => {
    const data = await getDocs(collection(db, 'posts'));
    data.forEach((item) => {
      const dataObj = { ...item.data(), id: item.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            className={activeTap === 'all' ? 'post__navigation--active' : ''}
            onClick={() => setActiveTap('all')}
          >
            전체
          </div>
          <div
            role="presentation"
            className={activeTap === 'my' ? 'post__navigation--active' : ''}
            onClick={() => setActiveTap('my')}
          >
            나의 글
          </div>
        </div>
      )}

      <div className="post__list">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <div key={i} className="post__box">
              <Link to={`/posts/${post.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile"></div>
                  <div className="post__author-name">{post.email}</div>
                  <div className="post__date">{post.created}</div>
                </div>
                <div className="post__title">{post.title}</div>
                <div className="post__text">{post.summary}</div>
              </Link>
              {post.email === user?.email ? (
                <div className="post__utils-box">
                  <div className="post__delete">삭제</div>
                  <Link to={`/posts/edit/${post.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <p className="post__no-post">게시글이 없습니다....</p>
        )}
      </div>
    </>
  );
}
