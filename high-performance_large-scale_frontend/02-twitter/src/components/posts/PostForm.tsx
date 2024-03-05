import AuthContext from 'context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from 'firebaseApp';
import { useContext, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getCurrentDate } from 'utils/Date';
import { v4 as uuidv4 } from 'uuid';

export default function PostForm() {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>();
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (files && files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
        const { result } = e.target as FileReader;
        if (typeof result === 'string') {
          setImageFile(result);
        }
      };
    }
  };

  const handleDeleteImg = () => {
    setImageFile(null);
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);

    try {
      // 이미지 업로드
      let imageUrl = '';
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, 'data_url');
        imageUrl = await getDownloadURL(data.ref);
      }
      // 업로드된 이미지 다운로드 url 업데이트

      await addDoc(collection(db, 'posts'), {
        content,
        createdAt: getCurrentDate(),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
        imageUrl,
      });

      // 값 초기화
      setContent('');
      setTags([]);
      setHashTag('');
      setImageFile(null);

      toast.success('게시글 생성~');
    } catch (error) {
      console.log(error);
    }

    setIsSubmitting(false);
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

  return (
    <form onSubmit={onSubmit} className="post-form">
      <textarea
        className="post-form__textarea"
        name="content"
        id="content"
        placeholder="What`s happing.."
        onChange={onChange}
        value={content}
        required
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
        <div className="post-form__image-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {imageFile && (
            <div className="post-form__attachment">
              <img src={imageFile} alt="attachment" width={100} height={100} />
              <button
                type="button"
                className="post-form__clear-btn"
                onClick={handleDeleteImg}
              >
                x
              </button>
            </div>
          )}
        </div>

        <input
          type="submit"
          value="Tweet"
          className="post-form__submit-btn"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
