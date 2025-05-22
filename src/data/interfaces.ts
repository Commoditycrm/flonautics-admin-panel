import type { UniqueIdentifier } from '@dnd-kit/core';

export interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
    id: string;
}

export interface BodyCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
    id: string;
}

export interface DragIndexState {
    active: UniqueIdentifier;
    over: UniqueIdentifier | undefined;
    direction?: 'left' | 'right';
}