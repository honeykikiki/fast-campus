import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { Params } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    await deleteDoc(doc(db, 'posts', post.id));
    toast.success('게시물 삭제 성공');
    return true;
  }

  return false;
};
