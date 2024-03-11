import { useRouter } from 'next/router';

export default function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query;
  return <div>StoreEditPage {id}</div>;
}
