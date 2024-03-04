import { getPostData } from 'api/posts/PostApi';
import { doc, updateDoc } from 'firebase/firestore';
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
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>();

  const getPost = useCallback(async () => {
    if (param.id) {
      const postData = await getPostData({ param });
      setPost(postData);
      setContent(post?.content ?? '');
      setTags(postData?.hashTags ?? []);
    }
  }, [param, post?.content]);

  const handleFileUpload = async () => {};

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          content,
          updateAt: getCurrentDate(),
          hashTags: tags,
        });

        console.log(post?.id, param.id);

        toast.success('게시글 수정');
        nav(`/posts/${post.id}`);
      }
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

  const removeTag = (tag: string) => {
    setTags(tags.filter((val) => val !== tag));
  };

  const onChangeHashTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setHashTag(value.trim());
  };

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== '') {
      // 만약에 같은 테그가 있으면 에러를 띄운다.
      // 태그를 생성해준다.
      if (tags.includes(e.target.value)) {
        toast.error('같은 태그가 있습니다.');
      } else {
        setTags((prev) => [...prev, hashTag ?? '']);
        setHashTag('');
      }
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
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, i) => (
            <span
              className="post-form__hashtags-tag"
              key={i}
              onClick={() => removeTag(tag)}
            >
              # {tag}
            </span>
          ))}
        </span>
        <input
          type="text"
          className="post-form__input"
          name="hashtags"
          id="hashtags"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>

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
