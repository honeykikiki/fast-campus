import { StoreType } from '@/interface';

import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import CurrentLocationButton from '@/components/CurrentLocationButton';

export default async function Home() {
  const stores: StoreType[] = await getData();

  return (
    <>
      <Map />
      <Markers stores={stores} />
      <CurrentLocationButton />
      <StoreBox />
    </>
  );
}

export async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error('data Fetch Failed');
  }

  return res.json();
}
