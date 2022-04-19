// Type definitions for @ag-grid-community/core v27.2.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Column } from "../../entities/column";
import { DraggingEvent } from "../../dragAndDrop/dragAndDropService";
import { DropListener } from "./bodyDropTarget";
import { ColumnEventType } from "../../events";
import { CtrlsService } from "../../ctrlsService";
export declare class MoveColumnFeature implements DropListener {
    private columnModel;
    private dragAndDropService;
    private gridOptionsWrapper;
    ctrlsService: CtrlsService;
    private gridBodyCon;
    private needToMoveLeft;
    private needToMoveRight;
    private movingIntervalId;
    private intervalCount;
    private pinned;
    private centerContainer;
    private lastDraggingEvent;
    private failedMoveAttempts;
    private eContainer;
    constructor(pinned: string | null, eContainer: HTMLElement);
    init(): void;
    getIconName(): string;
    onDragEnter(draggingEvent: DraggingEvent): void;
    onDragLeave(draggingEvent: DraggingEvent): void;
    setColumnsVisible(columns: Column[] | null | undefined, visible: boolean, source?: ColumnEventType): void;
    setColumnsPinned(columns: Column[] | null | undefined, pinned: string | null, source?: ColumnEventType): void;
    onDragStop(): void;
    private normaliseX;
    private checkCenterForScrolling;
    onDragging(draggingEvent: DraggingEvent, fromEnter?: boolean): void;
    private normaliseDirection;
    private calculateOldIndex;
    private attemptMoveColumns;
    private calculateValidMoves;
    private isColumnHidden;
    private ensureIntervalStarted;
    private ensureIntervalCleared;
    private moveInterval;
}