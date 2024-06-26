import AuthContext from 'context/AuthContext';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import styles from './Comment.module.scss';

export interface CommentProps {
  comment: string;
  uid: string;
  email: string;
  createdAt: string;
}

interface CommentBoxProps {
  data: CommentProps;
  post: PostProps;
}

export default function CommentBox({ data, post }: CommentBoxProps) {
  const { user } = useContext(AuthContext);
  const handleDeleteComment = async () => {
    const confirm = window.confirm('댓글을 삭제하시겠습니까?');

    if (confirm && post) {
      try {
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          comments: arrayRemove(data),
        });
        toast.success('댓글삭제');
      } catch (error) {}
    }
  };

  return (
    <div key={data?.createdAt} className={styles.comment}>
      <div className={styles.comment__borderBox}>
        <div className={styles.comment__imgBox}>
          <div className={styles.comment__flexBox}>
            <img src={'/logo192.png'} alt="profile" />
            <div className={styles.comment__email}>{data.email}</div>
            <div className={styles.comment__createdAt}>{data.createdAt}</div>
          </div>
        </div>
        <div className={styles.comment__content}>{data.comment}</div>
        {data.uid === user?.uid && (
          <div className={styles.comment__submitDiv}>
            <button
              type="button"
              className={styles.comment__deleteBtn}
              onClick={handleDeleteComment}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
