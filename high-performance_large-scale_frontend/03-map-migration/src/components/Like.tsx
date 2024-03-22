import { StoreType } from '@/interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

interface LikeProps {
  storeId: number;
}
export default function Like({ storeId }: LikeProps) {
  const { data: session, status } = useSession();
  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as StoreType;
  };
  const { data: store, refetch } = useQuery(
    `like-store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId,
      refetchOnWindowFocus: false,
    }
  );

  const toggleLike = async () => {
    // 찜 하기 || 찜 취소
    if (session?.user && store) {
      try {
        const like = await axios.post('/api/likes', {
          storeId: store.id,
        });

        if (like.status === 201) {
          toast.success('가게를 찜 햇습니다.');
        } else {
          toast.warning('찜을 취소 햇습니다.');
        }

        refetch();
      } catch (e) {
        console.log(e);
      }
    } else if (status === 'unauthenticated') {
      toast.warning('로그인 후 이용하실수 있습니다.');
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {/* 로그인된 사용자가 좋아요 한경우 */}
      {status === 'authenticated' &&
      store?.likes &&
      store?.likes?.length > 0 ? (
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
