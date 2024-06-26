import { useState } from 'react';
import Link from 'next/link';

import { BiMenu } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <Link className="navbar__logo" href="/">
          nextMap
        </Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href="/stores/new" className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            찜한 가게
          </Link>
          {status === 'authenticated' ? (
            <>
              <Link href="/users/mypage" className="navbar__list--item">
                마이페이지
              </Link>
              <button type="button" onClick={() => signOut()}>
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/api/auth/signin" className="navbar__list--item">
              로그인
            </Link>
          )}
        </div>
        {/* mobile button */}
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {/* mobile navbar */}
      {isOpen && (
        <div
          className="navbar--mobile"
          onClick={() => setIsOpen((val) => !val)}
        >
          <div className="navbar__list--mobile">
            <Link href="/stores" className="navbar__list--item--mobile">
              맛집 목록
            </Link>
            <Link href="/stores/new" className="navbar__list--item--mobile">
              맛집 등록
            </Link>
            <Link href="/users/likes" className="navbar__list--item--mobile">
              찜한 가게
            </Link>
            {status === 'authenticated' ? (
              <>
                <Link
                  href="/users/mypage"
                  className="navbar__list--item--mobile"
                >
                  마이페이지
                </Link>
                <button type="button" onClick={() => signOut()}>
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className="navbar__list--item--mobile"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
