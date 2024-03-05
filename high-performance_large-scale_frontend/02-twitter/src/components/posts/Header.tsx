import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function PostHeader() {
  const nav = useNavigate();

  return (
    <div className="post__header">
      <button
        type="button"
        onClick={() => {
          nav(-1);
        }}
      >
        <IoIosArrowBack className="post__header-btn" />
      </button>
    </div>
  );
}
