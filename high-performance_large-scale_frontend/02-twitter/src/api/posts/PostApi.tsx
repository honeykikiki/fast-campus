import { Firestore, doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { Params } from 'react-router-dom';

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

// export const
