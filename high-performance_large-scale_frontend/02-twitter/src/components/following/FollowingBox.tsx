import AuthContext from 'context/AuthContext';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCurrentDate } from 'utils/Date';

interface FollowingBoxProps {
  post: PostProps;
}
export interface UserProps {
  id: string;
}

export default function FollowingBox({ post }: FollowingBoxProps) {
  const { user } = useContext(AuthContext);
  const [postFollowers, setPostFollowers] = useState<any[]>([]);

  const onClickFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (user?.uid) {
        // 내가 주체가 되어 팔로일 컬렉션 생성 또는 업데이트
        const followingRef = doc(db, 'following', user.uid);
        await setDoc(
          followingRef,
          {
            users: arrayUnion({ id: user.uid }),
          },
          { merge: true }
        );

        // 팔로우 당하는 사람이 주체가 되어 팔로우 컬렉션 생석 또는 업데이트
        const followerRef = doc(db, 'follower', post.uid);
        await setDoc(
          followerRef,
          {
            users: arrayUnion({ id: user.uid }),
          },
          { merge: true }
        );
      }

      // 팔로잉 알림 생성
      await addDoc(collection(db, 'notifications'), {
        createdAt: getCurrentDate(),
        uid: post.uid,
        isRead: false,
        url: '#',
        content: `"${user?.email || user?.displayName}"가 팔로우 했습니다.`,
      });

      toast.success('팔로우');
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteFollow = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      if (user?.uid) {
        // 내가 주체가 되어 팔로일 컬렉션 생성 또는 업데이트
        const followingRef = doc(db, 'following', user.uid);
        await updateDoc(followingRef, {
          users: arrayRemove({ id: post.uid }),
        });

        // 팔로우 당하는 사람이 주체가 되어 팔로우 컬렉션 생석 또는 업데이트
        const followerRef = doc(db, 'follower', post.uid);
        await updateDoc(followerRef, {
          users: arrayRemove({ id: user.uid }),
        });
      }

      toast.success('언팔로우');
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = useCallback(async () => {
    if (post.uid) {
      const ref = doc(db, 'follower', post.uid);
      onSnapshot(ref, (snap) => {
        setPostFollowers([]);
        snap
          ?.data()
          ?.users?.map((user: UserProps) =>
            setPostFollowers((prev: UserProps[]) =>
              prev ? [...prev, user.id] : []
            )
          );
      });
    }
  }, [post.uid]);

  useEffect(() => {
    if (post.uid) {
      getFollowers();
    }
  }, [getFollowers, post.uid]);

  return (
    <>
      {postFollowers.includes(user?.uid) ? (
        <button
          type="button"
          className="post__following-btn"
          onClick={onClickDeleteFollow}
        >
          Following
        </button>
      ) : (
        <button
          type="button"
          className="post__follow-btn"
          onClick={onClickFollow}
        >
          Follow
        </button>
      )}
    </>
  );
}
