import { useContext, useState } from 'react';
import { PostProps } from './PostList';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';

interface CommentProps {
  post: PostProps;
  getPosts: () => void;
}

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  created: string;
}

export default function Comments({ post, getPosts }: CommentProps) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        const postRef = doc(db, 'posts', post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            created: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj), // 배열 추가 시 사용
            updateDoc: new Date().toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          });
          toast.success('댓글 작성 완료');
          setComment('');
          getPosts();
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.code);
    }
  };

  const handleDeleteComment = async (comment: CommentsInterface) => {
    const confirm = window.confirm('삭제하시겠습니까?');
    if (confirm && post.id) {
      try {
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          comments: arrayRemove(comment),
        });
        toast.success('댓글삭제 성공');
        getPosts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="comments">
      <form onSubmit={onSubmit} className="comments__form">
        <div className="form__block">
          <label htmlFor="comment">댓글입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          ></textarea>
          <div className="form__block form__block-reverse">
            <input type="submit" value="입력" className="form__btn-submit" />
          </div>
        </div>
      </form>
      <div className="comments__list">
        {post.comments &&
          post.comments
            .slice(0)
            .reverse()
            .map((comment) => (
              <div key={comment.created} className="comment__box">
                <div className="comment__profile-box">
                  <div className="comment__email">{comment.email}</div>
                  <div className="comment__date">{comment.created}</div>
                  {comment.uid === user?.uid && (
                    <div
                      className="comment__delete"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      삭제
                    </div>
                  )}
                </div>
                <div className="comment__text">{comment.content}</div>
              </div>
            ))}
      </div>
    </div>
  );
}
