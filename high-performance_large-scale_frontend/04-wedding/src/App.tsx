import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import FullScreenMessage from './components/shared/FullScreenMessage'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // 1. 웨딩 데이터 호출
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (res.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return res.json()
      })
      .then((data) => {
        setWedding(data)
      })
      .catch((e) => {
        setError(true)
        console.log(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (!loading) {
    return <FullScreenMessage type={'loading'} />
  }

  if (error) {
    return <FullScreenMessage type={'error'} />
  }

  return <div className={cx('container')}>{JSON.stringify(wedding)}</div>
}

export default App
