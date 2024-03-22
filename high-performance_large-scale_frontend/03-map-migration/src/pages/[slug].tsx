import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <h1>Router</h1>
      <h2>{router.query.slug}</h2>
      <div>
        <button
          type="button"
          onClick={() => {
            router.push({
              pathname: '/[slug]',
              query: { id: 1, slug: 'push' },
            });
          }}
        >
          push
        </button>
      </div>
      <br />
      <div>
        <button
          type="button"
          onClick={() => {
            router.replace({
              pathname: '/[slug]',
              query: { id: 1, slug: 'replace' },
            });
          }}
        >
          replace
        </button>
      </div>
      <br />
      <div>
        <button
          type="button"
          onClick={() => {
            router.reload();
          }}
        >
          reload
        </button>
      </div>
      <br />
      <Link href={'/Hello'}>Hello</Link>
      <br />
      <Link href={'/Bye'}>Bye</Link>
    </div>
  );
}
