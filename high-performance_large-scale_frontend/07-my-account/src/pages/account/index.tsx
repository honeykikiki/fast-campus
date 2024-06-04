import dynamic from 'next/dynamic'
import withAuth from '@/hooks/withAuth'

const Transaction = dynamic(
  () => import('@/components/account/Transaction'),
  {},
)

function AccountPage() {
  return (
    <div>
      <Transaction />
    </div>
  )
}

export default withAuth(AccountPage)
