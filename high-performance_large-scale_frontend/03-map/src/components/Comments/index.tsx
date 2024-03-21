import { useSession } from 'next-auth/react';
import CommentsForm from './CommentsForm';
import CommentsBox from './CommentsBox';
import { CommentApiResponse, StoreType } from '@/interface';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

interface CommentsProps {
  store: StoreType;
}

export default function Comments({ store }: CommentsProps) {
  const { status } = useSession();
  const router = useRouter();
  let { page = '1' } = router.query;
  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?storeId=${store.id}&limit=${10}&page=${page}`
    );

    return data as CommentApiResponse;
  };
  const { data: comments, refetch } = useQuery(
    `comments-${store.id}`,
    fetchComments
  );

  return (
    <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">
      {status === 'authenticated' && (
        <CommentsForm storeId={store.id} refetch={refetch} />
      )}
      <div className="my-10">
        {comments?.data && comments?.data?.length > 0 ? (
          comments?.data.map((comment, i) => (
            <CommentsBox key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-sm p-4 border border-gray-200 text-gray-200">
            댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
