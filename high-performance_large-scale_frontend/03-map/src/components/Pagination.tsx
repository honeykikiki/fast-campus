import Link from 'next/link';

interface PaginationProps {
  total: number;
  page: string;
  urlPath: string;
}

export default function Pagination({ total, page, urlPath }: PaginationProps) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap text-black">
      {(total ?? 0) <= 10 ? (
        [...Array(total)].map((x, i) => (
          <Link
            href={{ pathname: urlPath, query: { page: i + 1 } }}
            key={i}
            className=""
          >
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white ${
                i + 1 === parseInt(page, 10)
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-300'
              }`}
            >
              {i + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          {parseInt(page) > 1 && (
            <Link
              href={{
                pathname: urlPath,
                query: { page: parseInt(page) - 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white `}>
                이전
              </span>
            </Link>
          )}
          <Link href={{ pathname: urlPath, query: { page: page } }}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white text-blue-600`}
            >
              {page}
            </span>
          </Link>
          {parseInt(page) < (total ?? 0) && (
            <Link
              href={{
                pathname: urlPath,
                query: { page: parseInt(page) + 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white `}>
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
