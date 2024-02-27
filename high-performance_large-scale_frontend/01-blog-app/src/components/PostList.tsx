import AuthContext from 'context/AuthContext';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommentsInterface } from './Comments';

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryTypes;
}

export interface PostProps {
  id?: string;
  title: string;
  summary: string;
  content: string;
  email: string;
  created: string;
  updateAt: string;
  uid: string;
  category: CategoryTypes;
  comments: CommentsInterface[];
}

type TabType = 'all' | 'my';
export type CategoryTypes = 'Fronted' | 'Backed' | 'Web' | 'Native';
export const CATEGORIES: CategoryTypes[] = [
  'Fronted',
  'Backed',
  'Web',
  'Native',
];

export default function PostList({
  hasNavigation = true,
  defaultTab = 'all',
}: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTap, setActiveTap] = useState<TabType | CategoryTypes>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    let postRef = collection(db, 'posts');
    let postQuery;

    if (activeTap === 'my' && user?.uid) {
      // 내 게시글 가져오기
      postQuery = query(
        postRef,
        where('uid', '==', user.uid),
        orderBy('created', 'asc')
      );
    } else if (activeTap == 'all') {
      // 전체 게시글 가져오기
      postQuery = query(postRef, orderBy('created', 'asc'));
    } else {
      // category 게시글 가져오기
      postQuery = query(
        postRef,
        where('category', '==', activeTap),
        orderBy('created', 'asc')
      );
    }

    const data = await getDocs(postQuery);

    setPosts([]);
    data.forEach((item) => {
      const dataObj = { ...item.data(), id: item.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('게시물을 삭제 하시겠습니까?');

    if (confirm && id) {
      await deleteDoc(doc(db, 'posts', id));
      toast.success('게시글 삭제 완료');

      // 게시물 삭제 후 목록에서 해당 게시물을 제거합니다.
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTap]);

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
          {CATEGORIES.map((category) => (
            <div
              key={category}
              role="presentation"
              className={
                activeTap === category ? 'post__navigation--active' : ''
              }
              onClick={() => setActiveTap(category)}
            >
              {category}
            </div>
          ))}
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
                  <div
                    className="post__delete"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
                  <Link to={`/posts/edit/${post.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <div className="post__no-post">
            <p>게시글이 없습니다....</p>
            <h3>
              <Link to={'posts/new'}>글쓰러 가기~</Link>
            </h3>
          </div>
        )}
      </div>
    </>
  );
}
