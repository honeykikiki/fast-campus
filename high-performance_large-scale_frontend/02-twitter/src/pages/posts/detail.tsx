import { getPostData } from 'api/posts/PostApi';
import Loader from 'components/loader/Loader';
import PostHeader from 'components/posts/Header';
import PostBox from 'components/posts/PostBox';
import { PostProps } from 'pages/home';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PostDetailPage() {
  const param = useParams();

  const [post, setPost] = useState<PostProps>();

  const getPost = useCallback(async () => {
    if (param.id) {
      setPost(await getPostData({ param }));
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
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
}
