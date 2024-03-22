import { mapState } from '@/atom';
import { useState } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

export default function CurrentLocationButton() {
  const [loading, setLoading] = useState(false);
  const map = useRecoilValue(mapState);
  const handleCurrentPosition = () => {
    setLoading(true);
    // if ()
    const option = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        // 성공
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          if (currentPosition) {
            map.panTo(currentPosition);
            toast.success('현재 위치로 이동 되었습니다.');
          }

          setLoading(false);
          return currentPosition;
        },
        // 실패
        () => {
          toast.error('현재 위치를 가져올수 없습니다.');
          setLoading(false);
        },
        option
      );
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed w-full top-0 inset-x-0 h-screen flex flex-col justify-center bg-black/60 z-50">
          <div className="animate-spin w-10 h-10 text-blue-400 rounded-full border-[4px] m-auto border-t-transparent border-current" />
        </div>
      )}
      <button
        type="button"
        onClick={handleCurrentPosition}
        className="fixed z-10 p-2 shadow left-10 bottom-10 bg-gray-300 rounded-md  hover:shadow-lg focus:shadow-lg hover:bg-blue-200"
      >
        <MdOutlineMyLocation className="w-5 h-5" />
      </button>
    </>
  );
}
