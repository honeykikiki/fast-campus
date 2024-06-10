import Image from 'next/image'

function ImagePage() {
  return (
    <div>
      <Image
        src="https://cdn.pixabay.com/photo/2023/08/22/16/02/chrysanthemum-8206709_1280.jpg"
        alt={'고화질 이미지'}
        width={10}
        height={10}
      />
      <Image
        src="https://cdn.pixabay.com/photo/2023/08/22/16/02/chrysanthemum-8206709_1280.jpg"
        alt={'고화질 이미지'}
        width={10}
        height={10}
      />
      <Image
        src="https://cdn.pixabay.com/photo/2020/03/19/12/16/jellyfish-4947355_1280.jpg"
        alt={'고화질 이미지'}
        width={10}
        height={10}
      />
      <Image
        src="https://cdn.pixabay.com/photo/2023/08/22/16/02/chrysanthemum-8206709_1280.jpg"
        alt={'고화질 이미지'}
        width={200}
        height={200}
      />
      <Image
        src="https://cdn.pixabay.com/photo/2021/09/13/08/16/purple-flower-6620617_1280.jpg"
        alt={'고화질 이미지'}
        width={200}
        height={200}
      />
    </div>
  )
}

export default ImagePage
