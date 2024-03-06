import CommentBox from 'components/comment/CommentBox';
import CommentForm from 'components/comment/CommentForm';
import Loader from 'components/loader/Loader';
import PostHeader from 'components/posts/Header';
import PostBox from 'components/posts/PostBox';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetailPage() {
  const param = useParams();
  const [post, setPost] = useState<PostProps>();

  const getPost = useCallback(async () => {
    if (param.id) {
      const docRef = doc(db, 'posts', param.id);
      onSnapshot(docRef, (doc) => {
        setPost({ ...(doc.data() as PostProps), id: doc.id });
      });
    }
  }, [param]);

  useEffect(() => {
    if (param.id) {
      getPost();
    }
  }, [param, getPost]);

  return (
    <div className="post">
      <PostHeader />
      {post ? (
        <>
          <PostBox post={post} />
          <CommentForm post={post} />
          {post.comments
            ?.slice(0)
            ?.reverse()
            ?.map((data, index: number) => (
              <CommentBox key={index} data={data} post={post} />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
