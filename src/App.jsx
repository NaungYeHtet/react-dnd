import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function App() {
  const [items, setItems] = useState([
    {
      id: "one",
      content: "Item 1",
    },
    {
      id: "two",
      content: "Item 2",
    },
    {
      id: "three",
      content: "Item 3",
    },
  ]);
  const contentRefs = useRef([]);
  const onDragEnd = (result) => {
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    console.log(removed);
    newItems.splice(result.destination.index, 0, removed);
    console.log(newItems);
    setItems(newItems);
  };

  const handleItemContent = (value, i) => {
    const newItems = items;
    newItems[i].content = value;
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
                // isDragDisabled={isPreview}
              >
                {(provided, snapshot) => (
                  <div
                    snapshot={snapshot}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <Editor
                      onInit={(evt, editor) =>
                        (contentRefs.current[index] = editor)
                      }
                      initialValue={item.content}
                      init={{
                        height: 200,
                      }}
                      onChange={(e) =>
                        handleItemContent(e.target.getContent(), index)
                      }
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
