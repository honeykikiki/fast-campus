import { getPostData } from 'api/posts/PostApi';
import Loader from 'components/loader/Loader';
import PostBox from 'components/posts/PostBox';
import { PostProps } from 'pages/home';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';

export default function PostDetailPage() {
  const param = useParams();
  const nav = useNavigate();
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
      <div className="post__header">
        <button
          type="button"
          onClick={() => {
            nav(-1);
          }}
        >
          <IoIosArrowBack className="post__header-btn" />
        </button>
      </div>
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
}
