import { CommentType } from '@/interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface CommentListProps {
  comment: CommentType;
  displayStore?: boolean;
}

export default function CommentsBox({
  comment,
  displayStore,
}: CommentListProps) {
  const { data: session, status } = useSession();

  const handleDeleteComment = async (id: number) => {
    const confirm = window.confirm('댓글을 삭제하시겠습니까?');

    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);

        if (result.status === 200) {
          toast.success('댓글을 삭제했습니다.');
        } else {
          toast.error('다시 시도해주세요.');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
      <div>
        <img
          src={comment?.user?.image || '/images/markers/default.png'}
          width={40}
          height={40}
          className="rounded-full bg-gray-10 h-10 w-10"
          alt="profile image"
        />
      </div>
      <div className="flex flex-col space-y-1 flex-1">
        <div>
          {comment?.user?.name}
          <span className="text-sm">{comment?.user?.email}</span>
        </div>
        <div className="text-xs">
          {new Date(comment?.createdAt)?.toLocaleDateString()}
        </div>
        <div className="text-black mt-1 text-base">{comment.body}</div>
        {displayStore && comment.store && (
          <div className="mt-2">
            <Link
              href={`/stores/${comment.store.id}`}
              className="text-gray-500 hover:text-gray-400 text-xs underline font-medium"
            >
              {comment.store.name}
            </Link>
          </div>
        )}
      </div>
      <div>
        {comment.userId === session?.user.id && (
          <button
            type="button"
            onClick={() => handleDeleteComment(comment.id)}
            className="underline text-gray-500 hover:text-gray-400"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
