import React, { useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';

import Loading from '@/components/Loading';
import { StoreType } from '@/interface';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import Loader from '@/components/Loader';
import SearchFilter from '@/components/SearchFilter';

export default function StoreListPage() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const [q, setQ] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const searchParams = {
    q,
    district,
  };

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/stores?page=' + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });

    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(['stores', searchParams], fetchStores, {
    getNextPageParam: (lastPage) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });

  const FetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => fetchNextPage(), 500);
    }

    return () => clearTimeout(timerId);
  }, [FetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <SearchFilter setQ={setQ} setDistrict={setDistrict} />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreType, i: number) => (
                <li
                  className="flex justify-between gap-x-6 py-5"
                  key={store.id}
                >
                  <div className="flex gap-x-4">
                    <Image
                      src={
                        store?.category
                          ? `/images/markers/${store?.category}.png`
                          : '/images/markers/default.png'
                      }
                      width={48}
                      height={48}
                      alt={'이미지'}
                    />
                    <div className="">
                      <div className="text-sm font-semibold leading-9 text-gray-900">
                        {store?.name}
                      </div>
                      <div className="mt-1 text-xs font-semibold leading-5 text-gray-700">
                        {store?.name}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm font-semibold leading-9 text-gray-900">
                      {store?.address}
                    </div>
                    <div className="mt-1 text-xs font-semibold leading-5 text-gray-700">
                      {store?.phone || '번호 없음'} | {store?.foodCertifyName} |{' '}
                      {store?.category}
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>

      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}

      <div ref={ref} className="w-full touch-none h-10 mb-10"></div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

//   return {
//     props: { stores: stores.data },
//   };
// }
