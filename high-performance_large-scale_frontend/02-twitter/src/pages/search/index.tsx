import PostBox from 'components/posts/PostBox';
import { PostProps } from 'pages/home';
import { useContext, useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import AuthContext from 'context/AuthContext';
import { db } from 'firebaseApp';

export default function SearchPage() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>('');
  console.log(tagQuery);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagQuery(e.target.value.trim());
  };

  useEffect(() => {
    if (user) {
      let postRef = collection(db, 'posts');
      let postQuery = query(
        postRef,
        where('hashTags', 'array-contains-any', [tagQuery]),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(postQuery, (snapshot) => {
        let dateOb = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log('ss');

        setPosts(dateOb as PostProps[]);
      });
    }
  }, [tagQuery, user]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">
          <div className="home__title-text">Search</div>
        </div>
        <div className="home__search-div">
          <input
            type="text"
            className="home__search"
            placeholder="해시태그 검색"
            onChange={onChange}
          />
        </div>
        <div className="post">
          {/* Tweet Post */}
          <div className="post">
            {posts.length > 0 ? (
              posts.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className="post__no-posts">
                <div className="post__text">글이 없습니다.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
