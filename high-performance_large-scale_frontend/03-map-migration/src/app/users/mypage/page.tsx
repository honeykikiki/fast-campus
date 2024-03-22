'use client';

import CommentsBox from '@/components/Comments/CommentsBox';
import Pagination from '@/components/Pagination';
import { CommentApiResponse } from '@/interface';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

export default function MyPagePage({ params }: { params: { page: string } }) {
  const { data } = useSession();
  let { page = '1' } = params;
  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?limit=${10}&page=${page}&user=${true}`
    );

    return data as CommentApiResponse;
  };
  const { data: comments, refetch } = useQuery(
    `comments-${page}`,
    fetchComments
  );

  return (
    <div className="md:max-w-4xl mx-auto py-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          마이페이지
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          사용자 기본정보
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              이름
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.user.name ?? '사용자'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              이메일
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.user.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              이미지
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <img
                src={data?.user.image || '/images/markers/default.png'}
                className="rounded-full w-12 h-12"
                width={48}
                height={48}
                alt="프로필 이미지"
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              설정
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <button
                type="button"
                className="underline hover:text-gray-400"
                onClick={() => signOut()}
              >
                로그아웃
              </button>
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-8 px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          내가 작성한 댓글
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          댓글 리스트 ({comments?.totalCount}개)
        </p>
      </div>
      <div className="my-10">
        {comments?.data && comments?.data?.length > 0 ? (
          comments?.data.map((comment, i) => (
            <CommentsBox
              key={comment.id}
              comment={comment}
              displayStore={true}
            />
          ))
        ) : (
          <div className="text-sm p-4 border border-gray-200 text-gray-200">
            댓글이 없습니다.
          </div>
        )}
      </div>
      {comments?.totalPage && (
        <Pagination
          total={comments?.totalPage}
          page={page.toString()}
          // pathname={`/stores/${store.id}`}
          pathname={``}
        />
      )}
    </div>
  );
}
