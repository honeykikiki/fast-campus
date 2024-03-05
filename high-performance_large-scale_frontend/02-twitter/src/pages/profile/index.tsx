import PostBox from 'components/posts/PostBox';
import AuthContext from 'context/AuthContext';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PROFILE_DEFAULT_URL = '/logo512.png';
type TabType = 'my' | 'like';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('my');
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      let postRef = collection(db, 'posts');
      let myPostQuery = query(
        postRef,
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      let likePostQuery = query(
        postRef,
        where('likes', 'array-contains', user.uid),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(myPostQuery, (snapshot) => {
        let dateOb = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMyPosts(dateOb as PostProps[]);
      });

      onSnapshot(likePostQuery, (snapshot) => {
        let dateOb = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setLikePosts(dateOb as PostProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Profile</div>
        <div className="profile">
          <img
            src={user?.photoURL ?? PROFILE_DEFAULT_URL}
            alt="profile"
            className="profile__image"
            width={100}
            height={100}
          />
          <button
            type="button"
            className="profile__btn"
            onClick={() => nav('/profile/edit')}
          >
            프로필 수정
          </button>
        </div>
        <div className="profile__text">
          <div className="profile__name">{user?.displayName || '사용자님'}</div>
          <div className="profile__email">{user?.email || ''}</div>
        </div>
        <div className="home__tabs">
          <div
            className={` ${
              activeTab === 'my' ? 'home__tab--active' : ''
            } home__tab`}
            onClick={() => setActiveTab('my')}
          >
            For you
          </div>
          <div
            className={`${
              activeTab === 'like' ? 'home__tab--active' : ''
            } home__tab`}
            onClick={() => setActiveTab('like')}
          >
            Likes
          </div>
        </div>
      </div>

      {/* Tweet Post */}
      <div className="post">
        {activeTab === 'my' ? (
          myPosts.length > 0 ? (
            myPosts.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">글이 없습니다.</div>
            </div>
          )
        ) : likePosts.length > 0 ? (
          likePosts.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className="post__no-posts">
            <div className="post__text">글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
