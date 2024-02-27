import AuthContext from 'context/AuthContext';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  CATEGORIES,
  CategoryTypes as CategoryType,
  PostProps,
} from './PostList';

export default function PostForm() {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState<PostProps | null>(null);
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CategoryType>('Fronted');
  const nav = useNavigate();

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'title') {
      setTitle(value);
    }

    if (name === 'summary') {
      setSummary(value);
    }

    if (name === 'content') {
      setContent(value);
    }

    if (name === 'category') {
      setCategory(value as CategoryType);
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        // 만약 수정으로 온 겨우
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          updateAt: new Date().toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          uid: user?.uid,
          category,
        });
        toast.success('글 수정 완료');
        nav(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, 'posts'), {
          title,
          summary,
          content,
          created: new Date().toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          email: user?.email ?? '',
          category,
        });
        toast.success('글 작성 완료');
        nav('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('추가 실패');
    }
  };

  const getPosts = async (id: string) => {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);

    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  };

  useEffect(() => {
    if (id) {
      getPosts(id);
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
      setCategory(post.category);
    }
  }, [post]);

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <div className="form__block">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            onChange={onChange}
            value={title}
          />
        </div>

        <div className="form__block">
          <label htmlFor="category">카테고라</label>
          <select
            name="category"
            id="category"
            onChange={onChange}
            defaultValue={category}
          >
            <option value="">카테고리를 선택해주세요</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form__block">
          <label htmlFor="summary">요약</label>
          <input
            type="text"
            name="summary"
            id="summary"
            required
            onChange={onChange}
            value={summary}
          />
        </div>

        <div className="form__block">
          <label htmlFor="content">내용</label>
          <textarea
            name="content"
            id="content"
            required
            onChange={onChange}
            value={content}
          ></textarea>
        </div>

        <div className="form__block">
          <input
            type="submit"
            value={post && post.id ? '수정' : '제출'}
            className="form__btn--submit"
          />
        </div>
      </form>
    </>
  );
}
