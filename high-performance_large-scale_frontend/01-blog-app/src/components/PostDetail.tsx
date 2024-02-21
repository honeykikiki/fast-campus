import { Link } from 'react-router-dom';

export default function PostDetail() {
  return (
    <div className="post__detail">
      <div className="post__box">
        <div className="post__title">Lorem ipsum dolor sit</div>
        <div className="post__profile-box">
          <div className="post__profile"></div>
          <div className="post__author-name">작가이름</div>
          <div className="post__date">2023.01.01 월요일</div>
        </div>
        <div className="post__utils-box">
          <div className="post__delete">삭제</div>
          <div className="post__edit">
            <Link to={'/posts/edit/1'}>수정</Link>
          </div>
        </div>
        <div className="post__text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem odit
          dolores voluptatum atque laboriosam ex provident dolorem blanditiis
          veritatis laborum totam voluptates, accusantium dolor impedit dolores
          voluptatum atque laboriosam ex provident dolorem blanditiis veritatis
          laborum totam voluptates, accusantium dolor impedit dolores voluptatum
          atque laboriosam ex provident dolorem blanditiis veritatis laborum
          totam voluptates, accusantium dolor impedit perferendis in qui iure
          est!
        </div>
      </div>
    </div>
  );
}
