import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { Link, useParams } from 'react-router-dom';
import { PostProps } from './PostList';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/AuthContext';
import Loader from './Loader';

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState<PostProps | null>(null);

  const getPosts = async (id: string) => {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.id, docSnap.data());
    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  };

  const handleDelete = () => {};

  useEffect(() => {
    if (id) {
      getPosts(id);
    }
  }, [id]);

  return (
    <div className="post__detail">
      {post ? (
        <div className="post__box">
          <div className="post__title">{post?.title}</div>
          <div className="post__profile-box">
            <div className="post__profile"></div>
            <div className="post__author-name">{post?.email}</div>
            <div className="post__date">{post?.created}</div>
          </div>
          {post?.email === user?.email ? (
            <div className="post__utils-box">
              <div
                className="post__delete"
                role="presentation"
                onClick={handleDelete}
              >
                삭제
              </div>
              <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                수정
              </Link>
            </div>
          ) : null}
          <div className="post__text post__text-pre-wrap">{post?.content}</div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
