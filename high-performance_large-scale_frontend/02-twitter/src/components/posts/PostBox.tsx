import { PostProps } from 'pages/home';
import { AiFillHeart } from 'react-icons/ai';
import { FaUserCircle, FaRegComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface PostBoxProps {
  post: PostProps;
}
export default function PostBox({ post }: PostBoxProps) {
  const handleDelete = () => {};

  return (
    <div key={post.id} className="post__box">
      <Link to={`/posts/${post.id}`}>
        <div className="post__box-profile">
          <div className="post__flex">
            {post.profileUrl ? (
              <img
                src={post.profileUrl}
                alt="profileImage"
                className="post__box-profile-img"
              />
            ) : (
              <FaUserCircle className="post__box-profile-icon" />
            )}
            <div className="post__email">{post.email}</div>
            <div className="post__createdAt">{post.createdAt}</div>
          </div>
          <div className="post__box-content">{post.content}</div>
        </div>
      </Link>
      <div className="post__box-footer">
        {/* {post,uid === user.uid 인 경우} */}
        <>
          <button type="button" className="post__delete" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" className="post__edit">
            <Link to={`posts/edit/${post.id}`}>Edit</Link>
          </button>
        </>

        <>
          <button type="button" className="post__likes">
            <AiFillHeart />
            {post.likesCount || 0}
          </button>
          <button type="button" className="post__comment">
            <FaRegComment />
            {post.comments?.length || 0}
          </button>
        </>
      </div>
    </div>
  );
}
