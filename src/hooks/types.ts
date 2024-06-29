import type { DropResult } from 'react-beautiful-dnd';
import { Item } from '@/types/item';

export type Reorder = (list: Item[], startIndex: number, endIndex: number) => Item[];

export type OnDragEnd = (result: DropResult) => void;
