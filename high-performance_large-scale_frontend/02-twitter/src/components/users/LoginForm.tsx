import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { app } from 'firebaseApp';
import { useState } from 'react';
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
        setError('이메일 형식을 맞춰주세요.');
      } else {
        setError('');
      }
    }
    if (name === 'password') {
      setPassword(value);
      if (value.length < 8) {
        setError('비밀번호를 8자리 이상 입력해주세요.');
      } else {
        setError('');
      }
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('로그인 완료');
      nav('/');
    } catch (error: any) {
      console.log(error.code);
      toast.error('로그인 실패\n다시한번 해주세요.');
    }
  };
  const onClickSnsLogin = async (e: any) => {
    const {
      target: { name },
    } = e;

    let provider;
    const auth = getAuth(app);

    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    if (name === 'github') {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(
      auth,
      provider as GithubAuthProvider | GoogleAuthProvider
    )
      .then((res) => {
        console.log(res);
        toast.success('로그인 성공');
      })
      .catch((err) => {
        const errorMsg = err.message;
        toast.error(errorMsg);
      });
  };

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <div className="form__title">로그인</div>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={onChange}
        />
      </div>

      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="text"
          name="password"
          id="password"
          required
          value={password}
          onChange={onChange}
        />
      </div>

      {/* 에러가 있는겨우 */}
      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        계정이 없으신가요?
        <Link to="/users/signup" className="form__link">
          회원가입 하러가기
        </Link>
      </div>
      <div className="form__block--lg">
        <button
          type="submit"
          className="form__btn-submit"
          disabled={error.length > 0}
        >
          로그인
        </button>
      </div>
      <div className="form__block--lg">
        <button
          type="button"
          className="form__btn-google"
          name="google"
          onClick={onClickSnsLogin}
        >
          구굴 로그인
        </button>
      </div>
      <div className="form__block--lg">
        <button
          type="button"
          className="form__btn-github"
          name="github"
          onClick={onClickSnsLogin}
        >
          깃헙 로그인
        </button>
      </div>
    </form>
  );
}
