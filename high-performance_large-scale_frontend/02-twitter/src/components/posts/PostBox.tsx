import { deletePostData } from 'api/posts/PostApi';
import FollowingBox from 'components/following/FollowingBox';
import AuthContext from 'context/AuthContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useContext } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
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

  const toggleLike = async () => {
    const postRef = doc(db, 'posts', post.id);

    if (user) {
      if (post.likes?.includes(user.uid)) {
        // 사용자가 좋아요 미리 한경우좋아요 삭제
        await updateDoc(postRef, {
          likes: arrayRemove(user.uid),
          likeCount: post.likeCount ? post?.likeCount - 1 : 0,
        });
      } else {
        // 사용자가 좋아요를 한 경우 추가
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid),
          likeCount: post.likeCount ? post?.likeCount + 1 : 1,
        });
      }
    }
  };

  return (
    <div key={post.id} className="post__box">
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
          <div className="post__flex-between">
            <div className="post__flex">
              <div className="post__email">{post.email}</div>
              <div className="post__createdAt">{post.createdAt}</div>
            </div>
            {user?.uid !== post.uid && <FollowingBox post={post} />}
          </div>
        </div>
        <Link to={`/posts/${post.id}`}>
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
        </Link>
      </div>
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
          <button type="button" className="post__likes" onClick={toggleLike}>
            {post.likes?.includes(user?.uid ?? '') ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart />
            )}
            {post.likeCount || 0}
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
