import { deletePostData } from 'api/posts/PostApi';
import AuthContext from 'context/AuthContext';
import { PostProps } from 'pages/home';
import { useContext } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaUserCircle, FaRegComment } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

interface PostBoxProps {
  post: PostProps;
}
export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const handleDelete = async () => {
    let result: boolean = await deletePostData({ post });
    if (result) {
      nav('/');
    }
  };

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
          {post.imageUrl && (
            <div className="post__image-div">
              <img
                src={post.imageUrl}
                alt="postImage"
                width={100}
                height={100}
              />
            </div>
          )}
          <span className="post-form__hashtags-outputs">
            {post.hashTags?.map((tag, i) => (
              <span
                className="post-form__hashtags-tag"
                key={i}
                // onClick={() => removeTag(tag)}
              >
                # {tag}
              </span>
            ))}
          </span>
        </div>
      </Link>
      <div className="post__box-footer">
        {user?.uid === post.uid && (
          <>
            <button
              type="button"
              className="post__delete"
              onClick={handleDelete}
            >
              Delete
            </button>
            <Link to={`/posts/edit/${post.id}`} className="post__edit">
              <button type="button" className="post__edit">
                Edit
              </button>
            </Link>
          </>
        )}

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
