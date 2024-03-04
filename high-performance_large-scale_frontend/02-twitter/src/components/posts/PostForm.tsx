import AuthContext from 'context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getCurrentDate } from 'utils/Date';

export default function PostForm() {
  const [content, setContent] = useState('');
  const { user } = useContext(AuthContext);

  const handleFileUpload = async () => {};

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        content,
        createdAt: getCurrentDate(),
        uid: user?.uid,
        email: user?.email,
      });
      setContent('');
      toast.success('게시글 생성~');
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
        <input type="submit" value="Tweet" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
