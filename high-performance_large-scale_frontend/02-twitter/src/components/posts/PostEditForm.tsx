import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useCallback, useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrentDate } from 'utils/Date';

export default function PostEditForm() {
  const param = useParams();
  const nav = useNavigate();
  const [content, setContent] = useState('');
  const [post, setPost] = useState<PostProps>();

  const getPost = useCallback(async () => {
    if (param.id) {
      const docRef = doc(db, 'posts', param?.id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap.data() as PostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
    }
  }, [param.id]);

  const handleFileUpload = async () => {};

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          content,
          updateAt: getCurrentDate(),
        });
      }

      toast.success('게시글 수정');
      nav(`/posts/${post?.id}}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'content') {
      setContent(value);
    }
  };

  useEffect(() => {
    if (param.id) {
      getPost();
    }
  }, [param.id, getPost]);

  return (
    <form onSubmit={onSubmit} className="post-form">
      <textarea
        className="post-form__textarea"
        name="content"
        id="content"
        required
        placeholder="What`s happing.."
        onChange={onChange}
        value={content}
      ></textarea>
      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value="수정" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
