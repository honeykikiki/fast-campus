import {
  deletePostImage,
  getPostData,
  postImageUpload,
} from 'api/posts/PostApi';
import AuthContext from 'context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrentDate } from 'utils/Date';
import { imageUpload } from 'utils/image';
import PostHeader from './Header';

export default function PostEditForm() {
  const param = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [post, setPost] = useState<PostProps>();
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>();
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const getPost = useCallback(async () => {
    if (param.id) {
      const postData = await getPostData({ param });
      setPost(postData);
      setContent(post?.content ?? '');
      setTags(postData?.hashTags ?? []);
      setImageFile(post?.imageUrl ?? null);
    }
  }, [param, post?.content, post?.imageUrl]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    setImageFile(await imageUpload(files));
  };

  const handleDeleteImg = () => {
    setImageFile(null);
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (post) {
        // 기존 사진 지우고 새로운 사진 업로드
        await deletePostImage({ imageUrl: post.imageUrl });

        // 새로운 이미지가 있는경우 업로드
        let imageUrl = '';
        if (imageFile) {
          imageUrl = await postImageUpload({ uid: user?.uid ?? '', imageFile });
        }

        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          content,
          updateAt: getCurrentDate(),
          hashTags: tags,
          imageUrl,
        });

        toast.success('게시글 수정');
        nav(`/posts/${post.id}`);
      }
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

  useEffect(() => {
    if (param.id) {
      getPost();
    }
  }, [param.id, getPost]);

  return (
    <>
      <div className="post">
        <PostHeader />
      </div>
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
                <img
                  src={imageFile}
                  alt="attachment"
                  width={100}
                  height={100}
                />
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
            value="수정"
            className="post-form__submit-btn"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
}
