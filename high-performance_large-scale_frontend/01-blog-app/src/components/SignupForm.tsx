import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from 'firebaseApp';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function SignupForm() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      toast.success('회원가입 성공~');
      nav('/');
    } catch (error: any) {
      console.log(error);

      toast.error(error?.code);
    }
  };

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
      } else if (passwordConfirm.length > 0 && value !== passwordConfirm) {
        setError('비밀번호 확인 값이 다릅니다. 다시 확인해주세요');
      } else {
        setError('');
      }
    }

    if (name === 'passwordConfirm') {
      setPasswordConfirm(value);

      if (value.length < 8) {
        setError('8자리 이상 입력해주세요');
      } else if (value !== password) {
        console.log(password);
        console.log(passwordConfirm);
        setError('입력한 비밀번호와 값이 다릅니다. 다시 확인해주세요');
      } else {
        setError('');
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form form--lg">
        <h1 className="form__title">회원가입</h1>
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
            type="password"
            name="password"
            id="password"
            required
            onChange={onChange}
            value={password}
          />
        </div>

        <div className="form__block">
          <label htmlFor="passwordConfirm">비밀번호확인</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            required
            onChange={onChange}
            value={passwordConfirm}
          />
        </div>
        {error && error.length > 0 && (
          <div className="form__block">
            <p className="form__error">{error}</p>
          </div>
        )}

        <div className="form__block">
          계정이 있다면?
          <Link to={'/login'} className="form__link">
            로그인
          </Link>
        </div>

        <div className="form__block">
          <input
            type="submit"
            value="회원가입"
            className="form__btn--submit"
            disabled={error.length > 0}
          />
        </div>
      </form>
    </>
  );
}
