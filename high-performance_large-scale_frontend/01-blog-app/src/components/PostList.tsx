import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = 'all' | 'my';

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTap, setActiveTap] = useState<TabType>('all');

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            className={activeTap === 'all' ? 'post__navigation--active' : ''}
            onClick={() => setActiveTap('all')}
          >
            전체
          </div>
          <div
            role="presentation"
            className={activeTap === 'my' ? 'post__navigation--active' : ''}
            onClick={() => setActiveTap('my')}
          >
            나의 글
          </div>
        </div>
      )}

      <div className="post__list">
        {[...Array(10)].map((e, i) => (
          <div key={i} className="post__box">
            <Link to={`/posts/${i}`}>
              <div className="post__profile-box">
                <div className="post__profile"></div>
                <div className="post__author-name">작가이름</div>
                <div className="post__date">2023.01.01 월요일</div>
              </div>
              <div className="post__title">타이틀</div>
              <div className="post__text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                odit dolores voluptatum atque laboriosam ex provident dolorem
                blanditiis veritatis laborum totam voluptates, accusantium dolor
                impedit perferendis in qui iure est!
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
