'use client';

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

export type DraggableItem = {
  id: string;
  [key: string]: any;
};

interface DraggableListProps<T extends DraggableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

const DraggableList = <T extends DraggableItem>({
  items,
  onReorder,
  renderItem,
  className = '',
}: DraggableListProps<T>) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    // Update order property for each item
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    onReorder(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 ${className}`}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className={`transform transition-all duration-200 ${
                      snapshot.isDragging ? 'scale-105 shadow-lg' : ''
                    }`}
                  >
                    {renderItem(item, index)}
                  </motion.div>
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