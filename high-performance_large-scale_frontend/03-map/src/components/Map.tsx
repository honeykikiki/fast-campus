/* global kakao */
import Script from 'next/script';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const loadKakaoMap = () => {
    // 카카오맵
    window.kakao.maps.load(() => {
      const mapContainer = document.querySelector('#map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      new window.kakao.maps.Map(mapContainer, mapOption);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onLoad={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
