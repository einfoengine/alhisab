'use client';

import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

type DraggableItem = {
  id: string;
  [key: string]: unknown;
};

interface DraggableListProps {
  items: DraggableItem[];
  onReorder: (items: DraggableItem[]) => void;
  renderItem: (item: DraggableItem) => React.ReactNode;
  className?: string;
}

const DraggableList: React.FC<DraggableListProps> = ({ items, onReorder, renderItem, className = '' }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    
    onReorder(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="draggable-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 ${className}`}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 bg-white rounded-lg shadow-sm transform transition-all duration-200 ${
                      snapshot.isDragging ? 'scale-105 shadow-md' : ''
                    }`}
                  >
                    {renderItem(item)}
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
};

export default DraggableList; 