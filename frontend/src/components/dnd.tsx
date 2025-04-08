"use client"
import {
  DragDropContext as LibDragDropContext,
  Droppable as LibDroppable,
  Draggable as LibDraggable,
} from "react-beautiful-dnd"

// Re-export the components with proper types
export const DragDropContext = LibDragDropContext
export const Droppable = LibDroppable
export const Draggable = LibDraggable
