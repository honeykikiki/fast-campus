'use client';

import AddressSearch from '@/components/AddressSearch';
import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from '@/data/store';
import { StoreType } from '@/interface';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function StoreNewPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StoreType>();
  const router = useRouter();

  return (
    <form
      className="px-4 md:max-w-4xl mx-auto"
      onSubmit={handleSubmit(async (data) => {
        try {
          let result = await axios.post('/api/stores', data);
          console.log(result);
          if (result.status === 200) {
            // 성공
            toast.success('맛집을 등록했습니다.');
            router.replace(`/stores/${result?.data?.id}`);
          } else {
            // 실패
            toast.error('다시 시도해주세요.');
          }
          console.log(result);
        } catch (e) {
          console.log(e);
          toast.error('데이터 생성중 문제가 생겼습니다.\n 다시 시도해주세요.');
        }
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            맛집 등록
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            아래 내용을 입력해 맛집을 등록해주세요
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                가게명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="가게명 입력"
                  className="block px-2 w-full rounded-md border-0 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {isValid(errors.name?.type === 'required')}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                카테고리
              </label>
              <div className="mt-2">
                <select
                  {...register('category', { required: true })}
                  className="px-2  block w-full rounded-md border-0 outline-none py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">카테고리선택</option>
                  {CATEGORY_ARR.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {isValid(errors.category?.type === 'required')}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                연락처
              </label>
              <div className="mt-2">
                <input
                  {...register('phone', { required: true })}
                  className="px-2 block w-full rounded-md border-0 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {isValid(errors.phone?.type === 'required')}
              </div>
            </div>

            <AddressSearch
              register={register}
              errors={errors}
              setValue={setValue}
              isValid={isValid}
            />

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="foodCertifyName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                식품인증구분
              </label>
              <div className="mt-2">
                <select
                  {...register('foodCertifyName', { required: true })}
                  className="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">심품인증구분 선택</option>
                  {FOOD_CERTIFY_ARR.map((food) => (
                    <option key={food} value={food}>
                      {food}
                    </option>
                  ))}
                </select>
                {isValid(errors.foodCertifyName?.type === 'required')}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="storeType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                업종 구분
              </label>
              <div className="mt-2">
                <select
                  {...register('storeType', { required: true })}
                  className="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">업종구분 선택</option>
                  {STORE_TYPE_ARR.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {isValid(errors.storeType?.type === 'required')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          뒤로가기
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          제출하기
        </button>
      </div>
    </form>
  );
}

function isValid(isValid: boolean) {
  return (
    isValid && (
      <div className="pt-2 text-sm text-red-600">필수입력 사항입니다.</div>
    )
  );
}
