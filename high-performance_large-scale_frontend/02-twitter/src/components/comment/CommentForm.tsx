import AuthContext from 'context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { getCurrentDate } from 'utils/Date';

export interface CommentFormProps {
  post: PostProps;
}

export default function CommentForm({ post }: CommentFormProps) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (post) {
      const postRef = doc(db, 'posts', post.id);
      const commentObj = {
        comment,
        uid: user?.uid,
        email: user?.email,
        createdAt: getCurrentDate(),
      };

      try {
        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
        });

        toast.success('댓글 작성');
        setComment('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        name="comment"
        id="comment"
        className="post-form__textarea"
        placeholder="댓글입력"
        onChange={onChange}
        value={comment}
        required
      ></textarea>
      <div className="post-form__submit-area">
        <div></div>
        <input
          type="submit"
          value="Comment"
          className="post-form__submit-btn"
          disabled={!comment}
        />
      </div>
    </form>
  );
}
