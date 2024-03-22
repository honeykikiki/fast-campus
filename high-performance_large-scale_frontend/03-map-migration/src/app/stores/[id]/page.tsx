'use client';

import Loader from '@/components/Loader';
import { StoreType } from '@/interface';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import Map from '@/components/Map';
import Marker from '@/components/Marker';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Like from '@/components/Like';
import Comments from '@/components/Comments';

export default function StoreEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const { status } = useSession();
  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreType;
  };

  const {
    data: store,
    isFetching,
    isSuccess,
    isError,
  } = useQuery(`store-${id}`, fetchStore, {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const handleDelete = async () => {
    const confirm = window.confirm('맛집을 삭제 하시겠습니까?');
    if (confirm && store) {
      try {
        let result = await axios.delete(`/api/stores?id=${store.id}`);
        if (result.status === 200) {
          toast.success('맛집에 삭제되었습니다.');
          router.replace('/');
        } else {
          toast.error('다시 시도해주세요.');
        }
      } catch (e) {
        console.log(e);
        toast.error('다시 시도해주세요.');
      }
    }
  };

  // useEffect(() => {
  //   if (isSuccess && !store) {
  //     toast.error('가게의 정보가 없습니다.');
  //     router.replace('/');
  //   }
  // }, [isSuccess, store]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        다시 시도해주세요.
      </div>
    );
  }

  if (isFetching) {
    return <Loader className="mt-[20%]" />;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="md:flex justify-between items-center py-4 md:py-0">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {store?.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {store?.address}
            </p>
          </div>
          {status === 'authenticated' && store && (
            <div className="flex items-center gap-4 px-4 py-3">
              <Like storeId={store.id} />
              <Link
                className="bg-blue-700 hover:bg-blue-600 py-2 px-3.5 rounded-md text-white"
                href={`/stores/${store?.id}/edit`}
              >
                수정
              </Link>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-500 py-2 px-3.5 rounded-md text-white"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                카테고리
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.category}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                주소
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                위도 / 경도
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lat} / {store?.lng}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                연락처
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                식품인증 구분
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.foodCertifyName}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                업종명
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.storeType}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
          <Map lat={store.lat} lng={store.lng} />
          {/* zoom={1} */}
          <Marker store={store} />
        </div>
      )}

      {store && <Comments store={store} />}
    </>
  );
}
