import { Ref } from "react";

export type DrawEventHandler = React.MouseEventHandler<HTMLCanvasElement> | React.KeyboardEventHandler<HTMLCanvasElement>

class CoPaintingLogic {
    canvas: Ref<HTMLCanvasElement>;
    onEvent: (DrawEventHandler)[];
    lastEventIndex: number;

    constructor(canvas: Ref<HTMLCanvasElement>) {
        this.canvas = canvas
        this.onEvent = []
        this.lastEventIndex = 0
    }

    registerObserver(eventHandler: DrawEventHandler): number {
        this.onEvent.push(eventHandler);
        this.lastEventIndex += 1
        return this.lastEventIndex
    }

    unregisterObserver(eventHandler: DrawEventHandler) {

    }
}