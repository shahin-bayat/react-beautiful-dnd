import { useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function App() {
  const initialCharacters = [
    { id: '1', name: 'shahin' },
    { id: ' 2', name: 'shadi' },
    { id: '3', name: 'ramin' },
  ]
  const [characters, setCharacters] = useState(initialCharacters)

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setCharacters(items)
  }

  return (
    <div className='App'>
      <h1>Ordering</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='characters'>
          {provided => (
            <ul
              className='characters'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {characters.map(({ id, name }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {provided => (
                    <li
                      className='character'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {name}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App
