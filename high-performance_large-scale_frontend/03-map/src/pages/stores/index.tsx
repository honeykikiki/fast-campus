import { StoreType } from '@/interface';
import Image from 'next/image';

export default function StoreListPage({ stores }: { stores: StoreType[] }) {
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {stores.map((store, index) => (
          <li className="flex justify-between gap-x-6 py-5" key={store.id}>
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
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());

  return {
    props: { stores },
  };
}
