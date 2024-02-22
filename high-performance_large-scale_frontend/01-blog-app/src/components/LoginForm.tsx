import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from 'firebaseApp';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
      const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!value.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'password') {
      setPassword(value);

      if (value.length < 8) {
        setError('8자리 이상 입력해주세요');
      } else {
        setError('');
      }
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // app
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('로그인');
      nav('/');
    } catch (error: any) {
      toast.error(error?.code);
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form form--lg">
        <h1 className="form__title">로그인</h1>
        <div className="form__block">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={onChange}
            value={email}
          />
        </div>

        <div className="form__block">
          <label htmlFor="password">비밀번호</label>
          <input
            type="text"
            name="password"
            id="password"
            required
            onChange={onChange}
            value={password}
          />
        </div>

        {error && error.length > 0 && (
          <div className="form__block">
            <p className="form__error">{error}</p>
          </div>
        )}
        <div className="form__block">
          계정이 없다면?
          <Link to={'/signup'} className="form__link">
            회원가입하기
          </Link>
        </div>
        <div className="form__block">
          <input
            type="submit"
            value="로그인"
            className="form__btn--submit"
            disabled={error.length > 0}
          />
        </div>
      </form>
    </>
  );
}
