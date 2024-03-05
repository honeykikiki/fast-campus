import PostHeader from 'components/posts/Header';
import AuthContext from 'context/AuthContext';
import { updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import { storage } from 'firebaseApp';
import React, { useContext, useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { imageUpload } from 'utils/image';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_DOWNLOAD_URL_STR = 'https://firebasestorage.googleapis.com';

export default function ProfileEditPage() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'displayName') {
      setDisplayName(value);
    }
  };

  const handleDeleteImg = () => {
    setImageUrl(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    setImageUrl(await imageUpload(files));
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);

    try {
      // 기존 프로필이미지 이미지 삭제
      if (user?.photoURL && user.photoURL.includes(STORAGE_DOWNLOAD_URL_STR)) {
        const imageRef = ref(storage, user.photoURL);
        if (imageRef) {
          await deleteObject(imageRef).catch((error) => {
            console.log(error);
          });
        }
      }

      // 새로운 이미지가 있는경우 업로드
      let newImageUrl = null;
      if (imageUrl) {
        const data = await uploadString(storageRef, imageUrl, 'data_url');
        newImageUrl = await getDownloadURL(data.ref);
      }
      console.log(newImageUrl);

      if (user) {
        await updateProfile(user, {
          displayName,
          photoURL: newImageUrl,
        })
          .then(() => {
            toast.success('프로필 변경 완료~');
            nav('/profile');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user.photoURL);
    }
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user?.photoURL, user?.displayName]);

  return (
    <div className="post">
      <PostHeader />
      <form className="post-form" onSubmit={onSubmit}>
        <div className="post-form__profile">
          <input
            type="text"
            name="displayName"
            className="post-form__input"
            placeholder="이름"
            onChange={onChange}
            value={displayName}
          />
          {imageUrl && (
            <div className="post-form__attachment">
              <img src={imageUrl} alt="attachment" width={100} height={100} />
              <button
                type="button"
                className="post-form__clear-btn"
                onClick={handleDeleteImg}
              >
                x
              </button>
            </div>
          )}
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
            </div>
            <input
              type="submit"
              value="프로필 수정"
              className="post-form__submit-btn"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
