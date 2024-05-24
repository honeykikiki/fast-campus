import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
} from 'react-beautiful-dnd'
import { Virtuoso } from 'react-virtuoso'
import useEditLike from '@/components/settings/like/hooks/useEditLike'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import ListRow from '@/components/shared/ListRows'
import { Like } from '@/models/like'

function generateMocks() {
  const mock = []

  for (let i = 0; i < 1000; i++) {
    mock.push({
      id: `${i}`,
      hotelId: `hotel ${i}`,
      hotelName: `hotel ${i}`,
      hotelMainImageUrl: `hotel ${i}`,
      userId: '',
      order: i,
    } as Like)
  }

  return mock
}

function LikePage() {
  const { data, isEdit, reorder, save } = useEditLike()

  const handleDragEndDrop = (result: DropResult) => {
    if (result.destination == null) {
      return
    }

    const from = result.source.index
    const to = result.destination.index

    reorder(from, to)
  }

  const mocks = generateMocks()

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEndDrop}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              <Virtuoso
                useWindowScroll
                increaseViewportBy={0}
                itemContent={(idx, like) => {
                  return (
                    <Draggable key={like.id} draggableId={like.id} index={idx}>
                      {(droppableProps) => (
                        <li
                          ref={droppableProps.innerRef}
                          {...droppableProps.dragHandleProps}
                          {...droppableProps.draggableProps}
                        >
                          <ListRow
                            as="div"
                            contents={
                              <ListRow.Texts
                                title={like.order}
                                subTitle={like.hotelName}
                              />
                            }
                          />
                        </li>
                      )}
                    </Draggable>
                  )
                }}
                data={mocks}
              />
              {/* {data?.map((like, idx) => { */}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>

      {isEdit ? <FixedBottomButton label="저장하기" onClick={save} /> : null}
    </div>
  )
}

function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (enabled === false) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}

export default LikePage
