import { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useAlertContext } from '@/context/AlertContext'
import useLike from '@/hooks/like/useLike'
import { Like } from '@/models/like'
import { updateOrder } from '@/remote/like'

function useEditLike() {
  const { data } = useLike()
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const { open } = useAlertContext()
  const client = useQueryClient()

  useEffect(() => {
    if (data != null) {
      setUpdatedLikes(data)
    }
  }, [data])

  const reorder = useCallback((from: number, to: number) => {
    setIsEdit(true)
    setUpdatedLikes((prevUpdatedLikes) => {
      const newItems = [...prevUpdatedLikes]

      const [fromItem] = newItems.splice(from, 1)

      if (fromItem != null) {
        newItems.splice(to, 0, fromItem)
      }

      newItems.forEach((like, idx) => {
        like.order = idx + 1
      })

      return newItems
    })
  }, [])

  const save = async () => {
    try {
      await updateOrder(updatedLikes)
      client.setQueriesData(['likes'], updatedLikes)
      setUpdatedLikes([])
      setIsEdit(false)
    } catch (e) {
      open({
        title: '알수없는 에러가 발생했습니다. 잠시후 다시 시도해주세요',
        onButtonClick: () => {
          setUpdatedLikes([])
          setIsEdit(false)
        },
      })
    }
  }

  return { data: isEdit ? updatedLikes : data, isEdit, reorder, save }
}

export default useEditLike
