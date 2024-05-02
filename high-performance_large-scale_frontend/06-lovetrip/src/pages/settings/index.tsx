import { Link } from 'react-router-dom'
import ListRow from '@/components/shared/ListRows'

function SettingPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/settings/like">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="찜하기" subTitle="찜한 호텔 순서 변경" />
              }
              withArrow={true}
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SettingPage
