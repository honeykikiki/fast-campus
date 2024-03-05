import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadString,
} from 'firebase/storage';
import { db, storage } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { Params } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const getPostData = async ({
  param,
}: {
  param: Readonly<Params<string>>;
}) => {
  if (param.id) {
    const docRef = doc(db, 'posts', param?.id);
    const docSnap = await getDoc(docRef);

    return { ...(docSnap.data() as PostProps), id: docSnap.id };
  }
};

export const deletePostData = async ({
  post,
}: {
  post: PostProps;
}): Promise<boolean> => {
  const confirm = window.confirm('게시물을 삭제하시겠습니까?');
  if (confirm) {
    // 스토리지 이미지 삭제
    await deletePostImage({ imageUrl: post.imageUrl });
    await deleteDoc(doc(db, 'posts', post.id));
    toast.success('게시물 삭제 성공');
    return true;
  }

  return false;
};

export const deletePostImage = async ({ imageUrl }: { imageUrl?: string }) => {
  if (imageUrl) {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef).catch((error) => {
      console.log(error);
    });
  }
};

export const postImageUpload = async ({
  uid,
  imageFile,
}: {
  uid: string;
  imageFile: string;
}): Promise<string> => {
  let imageUrl = '';
  const key = `${uid}/${uuidv4()}`;
  const storageRef = ref(storage, key);
  const data = await uploadString(storageRef, imageFile, 'data_url');
  imageUrl = await getDownloadURL(data.ref);

  return imageUrl;
};
