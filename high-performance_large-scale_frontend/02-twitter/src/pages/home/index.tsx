import PostForm from 'components/posts/PostForm';
import PostBox from 'components/posts/PostBox';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import AuthContext from 'context/AuthContext';
import { db } from 'firebaseApp';
import { CommentProps } from 'components/comment/CommentBox';
import { UserProps } from 'components/following/FollowingBox';
import useTranslation from 'hooks/useTranslation';

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likeCount?: number;
  likes?: string[];
  comments?: CommentProps[];
  hashTags: string[];
  imageUrl?: string;
}

type TabType = 'all' | 'following';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [followingPosts, setFollowingPosts] = useState<PostProps[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>(['']);
  const { user } = useContext(AuthContext);
  const t = useTranslation();

  const getFollowers = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, 'following', user.uid);
      onSnapshot(ref, (snap) => {
        setFollowingIds(['']);
        snap
          ?.data()
          ?.users?.map((user: UserProps) =>
            setFollowingIds((prev: string[]) =>
              prev ? [...prev, user.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      let postRef = collection(db, 'posts');
      let postQuery = query(postRef, orderBy('createdAt', 'desc'));
      let followingPostQuery = query(
        postRef,
        where('uid', 'in', followingIds),
        orderBy('createdAt')
      );

      onSnapshot(postQuery, (snapshot) => {
        let dateOb = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setPosts(dateOb as PostProps[]);
      });

      onSnapshot(followingPostQuery, (snapshot) => {
        let dateOb = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setFollowingPosts(dateOb as PostProps[]);
      });
    }
  }, [followingIds, user]);

  useEffect(() => {
    if (user?.uid) {
      getFollowers();
    }
  }, [getFollowers, user?.uid]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div
            className={` ${
              activeTab === 'all' ? 'home__tab--active' : ''
            } home__tab`}
            onClick={() => setActiveTab('all')}
          >
            {t('TAB_ALL')}
          </div>
          <div
            className={`${
              activeTab === 'following' ? 'home__tab--active' : ''
            } home__tab`}
            onClick={() => setActiveTab('following')}
          >
            {t('TAB_FOLLOWING')}
          </div>
        </div>
      </div>

      {/* 게시물 입력 */}
      {activeTab === 'all' && <PostForm />}

      {/* Tweet Post */}
      {activeTab === 'all' ? (
        <div className="post">
          {posts.length > 0 ? (
            posts.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">글이 없습니다.</div>
            </div>
          )}
        </div>
      ) : (
        <div className="post">
          {followingPosts.length > 0 ? (
            followingPosts.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">글이 없습니다.</div>
            </div>
          )}
        </div>
      )}
      {/* footer */}
    </div>
  );
}
