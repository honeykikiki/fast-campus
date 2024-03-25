'use client';

import Loading from '@/components/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';
import Pagination from '@/components/Pagination';
import { LikeType } from '@/interface';
import StoreList from '@/components/StoreList';

export default function LikesPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page = '1' } = searchParams;

  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?limit=10&page=${page}`);
    return data;
  };

  const {
    data: likes,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(`likes-${page}`, fetchLikes);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <h3 className="text-lg font-semibold">찜한 맛집</h3>
      <div className="mt-1 text-gray-500 text-sm">찜한 가게 리스트입니다.</div>
      <ul role="list" className="divide-y divide-gray-100 mt-10">
        {isLoading ? (
          <Loading />
        ) : (
          likes?.map((like: LikeType, index: number) => (
            <StoreList store={like.store} key={index} />
          ))
        )}
        {isSuccess && likes.length <= 0 && (
          <div className="text-sm p-4 border border-gray-800 text-gray-600">
            찜한 가게가 없습니다.
          </div>
        )}
      </ul>

      <Pagination
        total={likes?.totalPage}
        page={page}
        pathname="/users/likes"
      />
    </div>
  );
}
