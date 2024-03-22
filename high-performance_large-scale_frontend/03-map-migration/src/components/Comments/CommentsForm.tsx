import axios from 'axios';
import { error } from 'console';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CommentsProps {
  storeId: number;
  refetch: () => void;
}

export default function CommentsForm({ storeId, refetch }: CommentsProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex flex-col space-y-2">
      <form
        onSubmit={handleSubmit(async (data) => {
          const result = await axios.post('/api/comments', {
            ...data,
            storeId,
          });

          if (result.status === 200) {
            toast.success('댓글을 작섣했습니다.');
            resetField('body');
            refetch();
          } else {
            toast.error('다시 시도해주세요.');
          }
        })}
      >
        <textarea
          rows={3}
          placeholder="댓글을 작성해주세요..."
          {...register('body', { required: true })}
          className="block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm leading-6"
        />
        {errors.body?.type === 'required' && (
          <div className="text-xs text-red-600 mt-1">필수 입력사항입니다.</div>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm mt-2 rounded-md w-full"
        >
          작성하기
        </button>
      </form>
    </div>
  );
}
